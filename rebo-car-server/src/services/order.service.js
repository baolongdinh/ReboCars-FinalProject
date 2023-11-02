const orderModel = require('../models/order.model');
const {} = require('../helpers/helperFunc');
const { buildOrderMatchFilterCondition, buildMatchSearchOrderCondition } = require('../helpers/mongo.helper');
const carService = require('./car.service');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');

//  {
//         start_date_time: { type: Date, required: true },
//         end_date_time: { type: Date, required: true },
//         delivery_receipt_address: { type: Schema.Types.Mixed, require: true },
//         prices_tables: {
//             price: {
//                 type: Number
//             },
//             discountPrice: {
//                 type: Number
//             },
//             brokerageCost: {
//                 type: Number
//             },
//             unitPrice: {
//                 type: Number
//             },
//             promotionDiscount: {
//                 type: Number
//             },
//             deliveryPrice: {
//                 type: Number
//             },
//             unitTotalPrice: {
//                 type: Number
//             }
//         },
//         status: {
//             type: String
//         },
//         reviewed: {
//             type: Boolean,
//             default: false
//         },
//         user_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'users',
//             require: true
//         },
//         car_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'cars',
//             require: true
//         }
//     },
const orderServices = {
    createOrder: async ({
        transaction_id,
        start_date_time,
        end_date_time,
        delivery_receipt_address,
        prices_table,
        status,
        user_id,
        car_id,
        car_owner_id
    }) => {
        if (!start_date_time || !end_date_time) {
            throw new BadRequestError('invalid request');
        }

        console.log({ transaction_id, prices_table });

        const order = await orderModel
            .create({
                transaction_id,
                start_date_time,
                end_date_time,
                delivery_receipt_address,
                prices_table,
                status,
                user_id,
                car_id,
                car_owner_id
            })
            .catch((err) => {
                throw new InternalServerError(err.message);
            });

        return order;
    },

    getAllOrders: async ({ limit = 12, page = 1, sort = { createdAt: -1 }, startDate, endDate, search }) => {
        try {
            const skip = (page - 1) * parseInt(limit);
            const orders = await orderModel.aggregate([
                {
                    $lookup: {
                        from: 'cars',
                        localField: '_id',
                        foreignField: 'car_id',
                        as: 'car_info'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'user_id',
                        as: 'user_info'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'car_owner_id',
                        as: 'car_owner_info'
                    }
                },
                {
                    $match: buildOrderMatchFilterCondition(startDate, endDate)
                },
                {
                    $match: buildMatchSearchOrderCondition(search)
                },
                { $limit: parseInt(limit) },
                { $skip: skip },
                { $sort: sort }
            ]);
            if (!orders) {
                throw new NotfoundError();
            }
            return orders;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    },

    getAllUserOrders: async (
        { limit = 12, page = 1 },
        {
            user_id,
            car_owner_id,
            sort = { start_date_time: -1 },
            start_date_time,
            end_date_time,
            historyOrders
        }
    ) => {
        try {
            const skip = (page - 1) * parseInt(limit);
            const orders = await orderModel.aggregate([
                {
                    $lookup: {
                        from: 'cars',
                        localField: 'car_id',
                        foreignField: '_id',
                        as: 'car_info'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_info'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'car_owner_id',
                        foreignField: '_id',
                        as: 'car_owner_info'
                    }
                },
                {
                    $match: buildOrderMatchFilterCondition(
                        start_date_time,
                        end_date_time,
                        historyOrders,
                        user_id,
                        car_owner_id
                    )
                },
                { $sort: sort },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);
            if (!orders) {
                throw new NotfoundError();
            }
            return orders;
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    },

    updateOrderById: async (
        orderId,
        {
            start_date_time,
            end_date_time,
            price_per_day,
            delivery_price,
            delivery_accept,
            receipt_place,
            delivery_place,
            delivery_distance,
            discount_rate
        }
    ) => {
        const orderUpdated = await orderModel
            .findByIdAndUpdate(
                orderId,
                {
                    start_date_time,
                    end_date_time,
                    price_per_day,
                    delivery_price,
                    delivery_accept,
                    receipt_place,
                    delivery_place,
                    delivery_distance,
                    discount_rate
                },
                {
                    new: true
                }
            )
            .catch((err) => {
                throw new InternalServerError(err.message);
            });

        return orderUpdated;
    },

    deleteOrderById: async (orderId) => {
        const orderExist = await orderModel.findById(orderId);
        if (!orderExist) {
            throw new BadRequestError('can not found order');
        }

        await orderModel.findByIdAndDelete(orderId).catch((err) => {
            throw new BadRequestError(err.message);
        });
    },
    reviewOrderById: async (orderId, { carId, userAvatar, userName, rate, comment }) => {
        try {
            console.log({ carId, userAvatar, userName, rate, comment });
            const orderExist = await orderModel.findById(orderId);
            if (!orderExist) {
                throw new BadRequestError('can not found order');
            }
            const date_created = new Date();
            carService
                .addCarReviewByCarId(carId, { userAvatar, userName, rate, comment, date_created })
                .catch((err) => {
                    throw new BadRequestError(err.message);
                });

            orderExist.reviewed = true;
            orderExist.review = {
                user_avatar: userAvatar,
                user_name: userName,
                rate: parseInt(rate),
                comment,
                date_created
            };
            orderExist.save();
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = orderServices;
