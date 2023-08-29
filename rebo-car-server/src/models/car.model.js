const { mongoose, Schema } = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    identifyNumber: String,
    images: {
      type: Array,
      default: [],
    },
    carType: String,
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    description: String,
    location: {
      type: Schema.Types.Mixed,
    },
    characteristic: {
      type: Array,
      default: [],
    },
    feature: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    vehicle_handling: Boolean,
    bookedNumber: Number,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

let carModel = mongoose.model("cars", carSchema);

module.exports = carModel;
