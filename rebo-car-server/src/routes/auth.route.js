var express = require('express');
var router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/admin/login', authController.adminLogin);
router.post('/signup', authController.signUp);
router.post('/refreshToken', authController.generateNewToken);
module.exports = router;
