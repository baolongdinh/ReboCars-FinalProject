const authService = require("../services/auth.services");
const { respondOK } = require("../helpers/respond.helper");
const authController = {
  login: async (req, res, next) => {
    authService
      .login(req.body.email, req.body.password)
      .then((data) => {
        respondOK(res, data, "login success", 200);
      })
      .catch((err) => {
        console.log("err: ", err);
        next(err);
      });
  },
  generateNewToken: (req, res, next) => {
    authService
      .generateNewAccessToken(req.body.refreshToken)
      .then((payload) => {
        respondOK(
          res,
          { payload },
          "generate new refresh token and access token success",
          201
        );
      })
      .catch((err) => {
        next(err);
      });
  },
};

module.exports = authController;
