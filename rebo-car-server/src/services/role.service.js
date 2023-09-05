const roleModel = require("../models/role.model");
var {
  BadRequestError,
  UnAuthorizedError,
  ForbiddenError,
  NotfoundError,
  InternalServerError,
} = require("../core/error.response");
// name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },

const roleServices = {
  getAllRoles: async () => {
    try {
      const roles = await roleModel.find().lean();
      return roles;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  },
  addRole: async ({ name, description, permissions }) => {
    try {
      const role = await roleModel.create({ name, description, permissions });
      return role;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  },
  updateRoleById: async (id, { name, description, permissions }) => {
    try {
      const role = await roleModel.findByIdAndUpdate(
        id,
        { name, description, permissions },
        { new: true }
      );
      return role;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  },
  deleteRoleById: async (id) => {
    try {
      await roleModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  },
  updatePermissionRoleById: async (id, { permissions }) => {
    try {
      const role = await roleModel.findByIdAndUpdate(
        id,
        { permissions },
        { new: true }
      );
      return role;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  },
};

module.exports = roleServices;
