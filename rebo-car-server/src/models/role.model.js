const { mongoose, Schema } = require("mongoose");

const userRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    permissions: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

let userRoleModel = mongoose.model("roles", userRoleSchema);

module.exports = userRoleModel;
