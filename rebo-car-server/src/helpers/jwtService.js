const jwt = require('jsonwebtoken');
var { BadRequestError, UnAuthorizedError } = require('../core/error.response');
const { token } = require('morgan');

const signAccessToken = (id, role, exp) => {
    try {
        const accessToken = jwt.sign(
            {
                id,
                role
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: exp
            }
        );

        return accessToken;
    } catch (error) {
        throw new BadRequestError('can not sign access token with jwt');
    }
};

const signRefreshToken = (id, role, exp) => {
    try {
        const refreshToken = jwt.sign(
            {
                id,
                role
            },
            process.env.JWT_REFRESH_KEY,
            {
                expiresIn: exp
            }
        );

        return refreshToken;
    } catch (error) {
        throw new BadRequestError('can not sign refresh token with jwt');
    }
};

const verifyAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        if (!accessToken) {
            reject(new UnAuthorizedError());
        }

        const token = accessToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, payload) => {
            if (err) {
                if ((err.name = 'TokenExpiredError')) {
                    reject(new UnAuthorizedError(err.message));
                }
                reject(new UnAuthorizedError(err));
            }
            resolve(payload);
        });
    });
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        if (!refreshToken) {
            reject(new UnAuthorizedError());
        }
        const token = refreshToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, payload) => {
            if (err) {
                if ((err.name = 'TokenExpiredError')) {
                    reject(new UnAuthorizedError(err.message));
                }
                reject(new UnAuthorizedError(err));
            }
            resolve(payload);
        });
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
