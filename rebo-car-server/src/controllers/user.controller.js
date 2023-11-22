const userServices = require('../services/user.service');
const { respondOK } = require('../helpers/respond.helper');
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
            next(err);
        });
    },
    getAllUser: async (req, res, next) => {
        await userServices
            .getAllUsers(req.query)
            .then((users) => {
                respondOK(res, users, 'get all users successfully', 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    findUsersFilterWithRegexString: async (req, res, next) => {
        console.log(req.query);
        await userServices
            .findUsersFilterWithRegexString(req.query)
            .then((users) => {
                respondOK(res, users, 'get all users successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    findUserById: async (req, res, next) => {
        await userServices
            .findUserById(req.params.id)
            .then((user) => {
                respondOK(res, user, 'get user successfully', 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    deleteUserById: async (req, res, next) => {
        await userServices
            .deleteUserById(req.params.id)
            .then(() => {
                respondOK(res, null, 'Deleted user successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    updateUserById: async (req, res, next) => {
        await userServices.updateUserById(req, res, req.params.id).catch((err) => {
            next(err);
        });
    },
    activeOrBlockUserById: async (req, res, next) => {
        await userServices
            .activeOrBlockUserById(req.params.id)
            .then((user) => {
                respondOK(res, { user }, 'active or update user successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateUserByIdByAdmin: async (req, res, next) => {
        await userServices
            .updateUserByIdByAdmin(req.params.id, req.body)
            .then((updatedUser) => {
                respondOK(res, { updatedUser }, 'Update user password successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    resetPwdByUserById: async (req, res, next) => {
        await userServices
            .resetPwdByUserById(req, req.params.id, req.body)
            .then(() => {
                respondOK(res, null, 'reset user password successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateAvatarByUserById: async (req, res, next) => {
        await userServices.updateUserAvtImageByID(req, res, req.params.id).catch((err) => {
            next(err);
        });
    }
};

module.exports = userController;
