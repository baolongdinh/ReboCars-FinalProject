const { mongoose, Schema } = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        transaction_id: { type: String, require: true },
        start_date_time: { type: Date, required: true },
        end_date_time: { type: Date, required: true },
        delivery_receipt_address: { type: Schema.Types.Mixed, require: true },
        prices_table: { type: Schema.Types.Mixed, require: true },
        status: {
            type: String,
            enum: ['Created', 'Car Received', 'Car Returned'],
            default: 'Created'
        },
        reviewed: {
            type: Boolean,
            default: false
        },
        review: {
            user_avatar: {
                type: String,
                require: true
            },
            user_name: {
                type: String,
                require: true
            },
            rate: {
                type: Number,
                default: 0
            },
            comment: {
                type: String
            },
            date_created: {
                type: Date,
                default: new Date()
            }
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
        },
        car_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cars',
            require: true
        },
        car_owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
        }
    },
    {
        timestamps: true
    }
);
let orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;
