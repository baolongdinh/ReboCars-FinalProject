const { mongoose, Schema } = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        identifyNumber: { type: String, require: true },
        images: { type: Array, default: [] },
        price: { type: Number, require: true },
        discount: { type: Number, default: 0 },
        description: { type: String },
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
        max_km_per_day: { type: Boolean, default: false }, //áp dụng phí vượt quá giới hạn
        mortgage: { type: Boolean, default: false }, //thế chấp
        bookedNumber: { type: Number, default: 0 },
        max_distance_delivery: { type: Number }, // số km tối đa có thể giao xe
        delivery_price_1km: { type: Number }, // chi phí giao xe trên 1 km
        max_delivery_free_price: { type: Number }, // miễn phí giao xe trong vòng
        max_distance_per_day: { type: Number }, // số km tối đa được chạy trên 1 ngày
        over_distance_per_km_price: { type: Number }, // phí vượt giới hạn
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
