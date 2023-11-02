const { mongoose, Schema } = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        identifyNumber: { type: String, require: true },
        images: { type: Array, default: [] },
        price: { type: Number, require: true },
        discount: { type: Number, default: 0 },
        delivery_price_1km: { type: Number },
        description: { type: String, require: true },
        location: { type: Schema.Types.Mixed, require: true },
        characteristics: {
            // đặc điểm xe
            typeOfCar: String, // Loại xe (Sedan, Mui trần..)
            autoMaker: String, // hãng xe
            seats: Number,
            transmission: String, // truyền động (số sàn, số tự động)
            fuel: String, // Nhiên liệu cho xe (xăng, điện, dầu)
            sfc_100km: Number, // mức tiêu hao nhiên liệu trên 100km (10L/100km)
            yearOfManufacture: Number
        },
        features: { type: Array, default: [] },
        reviews: { type: Array, default: [] },
        car_delivery: { type: Boolean, default: false }, //giao nhận xe
        mortgage: { type: Boolean, default: false }, //thế chấp
        bookedNumber: { type: Number, default: 0 },
        status: { type: Boolean, default: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            require: true
        }
    },
    {
        timestamps: true
    }
);

let carModel = mongoose.model('cars', carSchema);

module.exports = carModel;
