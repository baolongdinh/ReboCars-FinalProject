const { mongoose, Schema } = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        start_date_time: { type: Date, required: true },
        end_date_time: { type: Date, required: true },
        price_per_day: { type: Number, required: true },
        delivery_price: { type: Number, default: 0 },
        delivery_accept: { type: Boolean, default: false },
        receipt_place: { type: String },
        delivery_place: { type: String },
        delivery_distance: { type: Number, default: 0 },
        discount_rate: { type: Number, default: 0 },
        unit_price: {
            type: Number,
            default: function () {
                return this.price + this.delivery_price * this.delivery_distance - this.price * this.discount_rate;
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
