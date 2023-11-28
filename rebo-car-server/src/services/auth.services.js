const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const bcrypt = require('bcrypt');
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    signEmailVerifyToken,
    verifyEmailVerifyToken
} = require('../helpers/jwtService');
var { sendEmailToVerifyAccount } = require('./email.service');
const { respondOK, respondFailure } = require('../helpers/respond.helper');
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

            if (!userExist.active) throw new BadRequestError('account did not active or blocked');

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

    adminLogin: async (email, password) => {
        try {
            const userExist = await userModel.findOne({ email }).populate('role');

            if (!userExist) {
                throw new NotfoundError('can not found user email');
            }

            const checkedPassword = await bcrypt.compare(password, userExist.password);
            if (!checkedPassword) {
                throw new BadRequestError('email or password did not match');
            }

            if (!userExist.active) throw new BadRequestError('account did not active or blocked');

            if (userExist.role.name === 'USER') {
                throw new ForbiddenError('account permission denied');
            }

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

    signUp: async (req, res) => {
        const { email, password, rePassword, name, phone } = req.body;

        console.log(req.body);
        if (!password || !email || !rePassword || !name) {
            return respondFailure(res, 'invalid value', 403);
        }

        if (password !== rePassword) {
            return respondFailure(res, 'password and rePassword did not match', 400);
        }

        //Check email exist
        const emailExist = await userModel.findOne({ email });
        if (emailExist) {
            return respondFailure(res, 'Email exist', 400);
        }

        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);

        const role = await roleModel.findOne({ name: 'USER' });
        const newUser = await userModel
            .create({
                email,
                password: passwordHash,
                name,
                phone,
                role: role._id
            })
            .catch((err) => {
                return respondFailure(res, err.message, 400);
            });

        const verifyToken = signEmailVerifyToken(newUser._id, 60 * 15);
        const verifyEmailUrl = `http://localhost:5173/verifyemail?token=${verifyToken}`;
        sendEmailToVerifyAccount(newUser.email, 'ReboCars - Verify your email', {
            verifyEmailUrl
        }).catch((err) => console.log(err));

        delete newUser._doc.password;
        return respondOK(res, { newUser }, 'user added successfully', 201);
    },

    verifyEmailByToken: async (verifyToken) => {
        try {
            const { id } = await verifyEmailVerifyToken('Bearer ' + verifyToken);

            if (!id) {
                throw new UnAuthorizedError('can not verify user Id');
            }

            const user = await userModel.findByIdAndUpdate(
                id,
                {
                    active: true
                },
                {
                    new: true
                }
            );

            return user;
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
