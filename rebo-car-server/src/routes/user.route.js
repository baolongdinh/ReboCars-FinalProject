var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const defineEndpoint = (req, res, next) => {
    req.endpoint = 'userCars';
    next();
};
/* GET users listing. */

router.get('/:id', userController.findUserById);

router.get('/', userController.getAllUser);

router.post('/', userController.addNewUser);

router.put('/:id', defineEndpoint, authMiddleware.isUserLoggedIn, userController.updateUserById);

router.patch(
    '/resetpwd/:id',
    defineEndpoint,
    authMiddleware.isUserLoggedIn,
    userController.resetPwdByUserById
);

router.patch(
    '/updateAvatar/:id',
    defineEndpoint,
    authMiddleware.isUserLoggedIn,
    userController.updateAvatarByUserById
);

module.exports = router;
