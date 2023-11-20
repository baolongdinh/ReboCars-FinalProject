const authService = require('../services/auth.services');
const { respondOK } = require('../helpers/respond.helper');
const authController = {
    login: async (req, res, next) => {
        authService
            .login(req.body.email, req.body.password)
            .then((data) => {
                respondOK(res, data, 'login success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    adminLogin: async (req, res, next) => {
        authService
            .adminLogin(req.body.email, req.body.password)
            .then((data) => {
                respondOK(res, data, 'login success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    signUp: async (req, res, next) => {
        authService.signUp(req, res).catch((err) => {
            next(err);
        });
    },
    generateNewToken: (req, res, next) => {
        authService
            .generateNewAccessToken(req.body.refreshToken)
            .then((payload) => {
                respondOK(res, { payload }, 'generate new refresh token and access token success', 201);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = authController;
