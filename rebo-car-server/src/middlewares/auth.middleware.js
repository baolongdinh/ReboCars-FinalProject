const jwt = require("jsonwebtoken");
var {
    BadRequestError,
    UnAuthorizedError,
    NotfoundError,
    InternalServerError,
} = require("../core/error.response");
const { respondFailure } = require("../helpers/respond.helper");
const { verifyAccessToken } = require("../helpers/jwtService");
const roleModel = require("../models/role.model");
const carService = require("../services/car.service");
const { error } = require("winston");
const { checkUserPermission } = require("../helpers/helperFunc");

const authMiddleware = {
    checkPermission: async (req, res, next) => {
        const token = req.header("authToken");
        const endpoint = req.endpoint;
        const method = req.method;

        if (!token) {
            throw new UnAuthorizedError("permission denied");
        }

        verifyAccessToken(token)
            .then(async (userTokenInfo) => {
                if (userTokenInfo) {
                    
                    roleModel
                        .findById(userTokenInfo.role._id)
                        .then((role) => {
                            if (!role)
                                throw new NotfoundError(
                                    "can not found role Id"
                                );

                            if (checkUserPermission(role, endpoint, method)) {
                                req.user = userTokenInfo;
                                next();
                            } else {
                                throw new UnAuthorizedError(
                                    "permission denied"
                                );
                            }
                        })
                        .catch((err) => next(err));
                } else {
                    throw new UnAuthorizedError("permission denied");
                }
            })
            .catch((err) => next(err));
    },
    isUserLoggedIn: async (req, res, next) => {
        const token = req.header("authToken");
        verifyAccessToken(token)
            .then(async (userTokenInfo) => {
                if (userTokenInfo) {
                    req.user = userTokenInfo;
                    next();
                } else {
                    throw new UnAuthorizedError("permission denied");
                }
            })
            .catch((err) => next(err));
    },
};

module.exports = authMiddleware;
