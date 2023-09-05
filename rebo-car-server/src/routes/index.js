var express = require("express");
var router = express.Router();
var userRouter = require("./user.route.js");
var carRouter = require("./car.route.js");
var authRouter = require("./auth.route.js");
var adminRouter = require("./admin");

router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/cars", carRouter);
router.use("/auth", authRouter);

module.exports = router;
