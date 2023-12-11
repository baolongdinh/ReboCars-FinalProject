var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);
router.post('/signup', authController.signUp);
router.post('/refreshToken', authController.generateNewToken);
router.get('/verifyemail', authController.verifyEmailByToken);
router.post('/forgotpassword', authController.forgotPassword);
router.put('/resetpassword', authController.verifyTokenAndResetPwd);

module.exports = router;
