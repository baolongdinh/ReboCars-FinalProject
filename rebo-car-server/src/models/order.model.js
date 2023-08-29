const {mongoose , Schema}= require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    start_date_time: {
      type: Date,
      required: true,
    },
    end_date_time: {
        type: Date,
        required: true,
    },
    price : {
    type: Number,
    required: true,
    },
    discount_rate : {
        type: Number,
        default : 0
    },
    unit_price : { 
        type: Number,
        default : function() { 
            return this.price - (this.price * this.discount_rate)
        }
    },
    location_receipt_car: {
      type: String,
      required: true,
    },
    accepted: {
      type: Boolean,
      default : false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require : true
    },
    car_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars',
        require : true
    }
    
  },
  {
    timestamps: true,
  }
);
let orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
