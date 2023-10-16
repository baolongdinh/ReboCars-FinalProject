const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwtService');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');
const authService = {
    login: async (email, password) => {
        try {
            const userExist = await userModel.findOne({ email }).populate('role');

            if (!userExist) {
                throw new NotfoundError('can not found user email');
            }

            const checkedPassword = await bcrypt.compare(password, userExist.password);
            if (!checkedPassword) {
                throw new BadRequestError('email or password did not match');
            }

            //   if (!userExist.active)
            //     throw new BadRequestError("user did not active or get blocked");

            const accessToken = signAccessToken(userExist._id, userExist.role, 60 * 5);

            const refreshToken = signRefreshToken(userExist._id, userExist.role, 60 * 60 * 24 * 365);

            // delete properties
            delete userExist._doc.password;

            //add properties
            userExist._doc.accessToken = accessToken;
            userExist._doc.refreshToken = refreshToken;

            return userExist;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

    generateNewAccessToken: async (refreshToken) => {
        try {
            console.log('refreshToken', refreshToken);
            const { id, role } = await verifyRefreshToken(refreshToken);
            console.log({ id, role });
            const newAccessToken = signAccessToken(id, role, 60 * 5);
            const newRefreshToken = signRefreshToken(id, role, 60 * 60 * 24 * 365);

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = authService;
