const orderModel = require('../models/order.model');
const {} = require('../helpers/helperFunc');
const { buildOrderMatchFilterCondition, buildMatchSearchOrderCondition } = require('../helpers/mongo.helper');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');

//         start_date_time: { type: Date, required: true },
//         end_date_time: { type: Date, required: true },
//         price_per_day: { type: Number, required: true },
//         delivery_price: { type: Number, default: 0 },
//         delivery_accept: { type: Boolean, default: false },
//         receipt_place: { type: String },
//         delivery_place: { type: String },
//         delivery_distance: { type: Number, default: 0 },
//         discount_rate: { type: Number, default: 0 },
//         unit_price: {
//             type: Number,
//             default: function () {
//                 return this.price + this.delivery_price * this.delivery_distance - this.price * this.discount_rate;
//             }
//         },
//         user_id:
//         car_id:

const orderServices = {
    createOrder: async ({
        start_date_time,
        end_date_time,
        price_per_day,
        delivery_price,
        delivery_accept,
        receipt_place,
        delivery_place,
        delivery_distance,
        discount_rate,
        user_id,
        car_id,
        car_owner_id
    }) => {
        if (!start_date_time || !end_date_time) {
            throw new BadRequestError('invalid request');
        }

        const order = await orderModel
            .create({
                start_date_time,
                end_date_time,
                price_per_day,
                delivery_price,
                delivery_accept,
                receipt_place,
                delivery_place,
                delivery_distance,
                discount_rate,
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
        await orderModel.findByIdAndDelete(orderId).catch((err) => {
            throw new InternalServerError(err.message);
        });
    }
};

module.exports = orderServices;
