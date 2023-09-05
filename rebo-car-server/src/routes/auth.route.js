var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/refreshToken", authController.generateNewToken);
module.exports = router;
