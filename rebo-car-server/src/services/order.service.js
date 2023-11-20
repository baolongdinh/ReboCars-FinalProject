const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');
const carModel = require('../models/car.model');
var mongoose = require('mongoose');
const {} = require('../helpers/helperFunc');
const { buildOrderMatchFilterCondition, buildMatchSearchOrderCondition } = require('../helpers/mongo.helper');
const carService = require('./car.service');
var { sendEmailToVerifyAccount, sendEmailOrderConfirm } = require('./email.service');
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
        try {
            if (!start_date_time || !end_date_time) {
                throw new BadRequestError('invalid request');
            }

            const orderSelectFields = {
                start_date_time: 1,
                end_date_time: 1
            };

            const carOrders = await orderModel
                .find({
                    car_id: new mongoose.Types.ObjectId(car_id),
                    end_date_time: {
                        $gte: new Date()
                    }
                })
                .select(orderSelectFields);

            console.log({ carOrders });

            async function checkAvailableOrder() {
                for (let i = 0; i < carOrders.length; i++) {
                    if (
                        new Date(start_date_time) > new Date(carOrders[i].end_date_time) ||
                        new Date(end_date_time) < new Date(carOrders[i].start_date_time)
                    ) {
                        console.log('passed');
                    } else {
                        console.log('failed');
                        return false;
                    }
                }

                return true;
            }

            if (!(await checkAvailableOrder())) {
                throw new BadRequestError(
                    'Order from startDate to endDate not available, please choose another date range'
                );
            }

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

            if (order) {
                const userInfo = await userModel.findById(order.user_id).lean();
                const carOwnerInfo = await userModel.findById(order.car_owner_id).lean();
                const carInfo = await carModel.findById(order.car_id).lean();

                if (!userInfo && !carOwnerInfo && carInfo) {
                    throw new BadRequestError('userId or carOwnerId or car_id not exist');
                }

                const prices_table_clone = structuredClone(prices_table);
                Object.keys(prices_table_clone).forEach(function (key, index) {
                    prices_table_clone[key] = parseInt(prices_table_clone[key])
                        .toLocaleString()
                        .replace(',', ' ');
                });

                console.log({ prices_table_clone });

                sendEmailOrderConfirm(userInfo.email, 'ReboCars - Thông báo đặt thuê xe thành công', {
                    order_id: order._id,
                    brokerageCost: prices_table_clone.brokerageCost,
                    depositPrice: prices_table_clone.depositPrice,
                    discountPrice: prices_table_clone.discountPrice,
                    payLaterPrice: prices_table_clone.payLaterPrice,
                    dateBetween: prices_table.dateBetween,
                    price: prices_table_clone.price,
                    promotionDiscount: prices_table_clone?.promotionDiscount || 0,
                    deliveryPrice: prices_table_clone?.deliveryPrice || 0,
                    unitPrice: prices_table_clone.unitPrice,
                    unitTotalPrice: prices_table_clone.unitTotalPrice,
                    delivery_receipt_address: delivery_receipt_address.description,
                    start_date_time: new Date(start_date_time).toLocaleString(),
                    end_date_time: new Date(end_date_time).toLocaleString(),
                    createdAt: new Date(order.createdAt).toLocaleString(),
                    userEmail: userInfo.email,
                    userPhone: userInfo.phone,
                    userName: userInfo.name,
                    carOwnerEmail: carOwnerInfo.email,
                    carOwnerPhone: carOwnerInfo.phone,
                    carOwnerName: carOwnerInfo.name
                }).catch((err) => console.log(err));

                sendEmailOrderConfirm(carOwnerInfo.email, 'ReboCars - Thông báo có đơn hàng đặt thuê xe', {
                    order_id: order._id,
                    brokerageCost: prices_table_clone.brokerageCost,
                    depositPrice: prices_table_clone.depositPrice,
                    discountPrice: prices_table_clone.discountPrice,
                    payLaterPrice: prices_table_clone.payLaterPrice,
                    dateBetween: prices_table.dateBetween,
                    price: prices_table_clone.price,
                    promotionDiscount: prices_table_clone.promotionDiscount,
                    deliveryPrice: prices_table_clone.deliveryPrice,
                    unitPrice: prices_table_clone.unitPrice,
                    unitTotalPrice: prices_table_clone.unitTotalPrice,
                    delivery_receipt_address: delivery_receipt_address.description,
                    start_date_time: new Date(start_date_time).toLocaleString(),
                    end_date_time: new Date(end_date_time).toLocaleString(),
                    createdAt: new Date(order.createdAt).toLocaleString(),
                    userEmail: userInfo.email,
                    userPhone: userInfo.phone,
                    userName: userInfo.name,
                    carOwnerEmail: carOwnerInfo.email,
                    carOwnerPhone: carOwnerInfo.phone,
                    carOwnerName: carOwnerInfo.name
                }).catch((err) => console.log(err));
            }

            return order;
        } catch (error) {
            throw new BadRequestError(error);
        }
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
        { limit, page },
        {
            user_id,
            car_owner_id,
            car_id,
            sort = { createdAt: -1 },
            start_date_time,
            end_date_time,
            historyOrders
        }
    ) => {
        try {
            limit = parseInt(limit) || 99999;
            page = parseInt(page) || 1;

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
                        car_owner_id,
                        car_id
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
    },
    loadTotalOrderStatics: async ({ filter }) => {
        try {
            var groupStage = {
                year: '$year'
            };

            if (filter === 'month') {
                groupStage = { ...groupStage, month: '$month' };
            }

            const orders = await orderModel.aggregate([
                {
                    $project: {
                        month: { $month: '$createdAt' }, // Extract the month from the createdAt field
                        year: { $year: '$createdAt' }, // Extract the year if needed
                        unitTotalPrice: '$prices_table.unitTotalPrice'
                        // Add other fields you want to include in the result
                    }
                },
                {
                    $group: {
                        _id: groupStage,
                        totalOrders: { $sum: 1 }, // Count the number of orders
                        totalSales: { $sum: '$unitTotalPrice' }
                        // Add other fields you want to include in the result
                    }
                },
                {
                    $sort: {
                        '_id.year': 1, // Sort by year in ascending order
                        '_id.month': 1 // Sort by month in ascending order
                    }
                }
            ]);

            console.log(orders);
            return orders;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = orderServices;
