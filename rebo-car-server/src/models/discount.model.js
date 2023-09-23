const { mongoose, Schema } = require("mongoose");

const discountSchema = new Schema(
   {
      discount_name: { type: String, require: true },
      discount_image: { type: String, require: true },
      discount_description: { type: String, require: true },
      discount_value: { type: Number, require: true },
      discount_code: { type: String, require: true },
      discount_start_date: { type: Date, require: true },
      discount_end_date: { type: Date, require: true },
      discount_max_uses: { type: Number, require: true },
      discount_uses_count: { type: Number, default: 0 },
      discount_users_used: { type: Array, default: [] },
      discount_active: { type: Array, default: true },
   },
   {
      timestamps: true,
   }
);

let discountModel = mongoose.model("discounts", discountSchema);

module.exports = discountModel;
