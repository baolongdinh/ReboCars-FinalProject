const userServices = require("../services/user.service");
const { respondOK } = require("../helpers/respond.helper");
// email: {
//   type: String,
//   required: true,
// },
//      : {
//   type: String,
//   require: true,
// },
// password : {
//     type: String,
//       required: true,
//     },
// avatar: {
//   type: String,
// },
// phone: {
//   type: String,
// },
// driving_license: {
//  type: Schema.Types.Mixed,
// },
// role: {
//   type: String,
// },
const userController = {
  addNewUser: async (req, res, next) => {
    await userServices.addUser(req, res).catch((err) => {
      console.log("err: ", err);
      next(err);
    });
  },
  getAllUser: async (req, res, next) => {
    await userServices.getAllUsers(res, req.query).catch((err) => {
      console.log("err: ", err);
      next(err);
    });
  },
  deleteUserById: async (req, res, next) => {
    await userServices.deleteUserById(res, req.params.id).catch((err) => {
      console.log("err: ", err);
      next(err);
    });
  },
  updateUserById: async (req, res, next) => {
    await userServices
      .updateUserById(res, req.params.id, req.body)
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },
  resetPwdByUserById: async (req, res, next) => {
    await userServices
      .resetPwdByUserById(res, req.params.id, req.body)
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },

  updateAvatarByUserById: async (req, res, next) => {
    await userServices
      .updateUserAvtImageByID(req, res, req.params.id)
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },
};

module.exports = userController;
