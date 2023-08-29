var express = require("express");
var router = express.Router();
var userRouter = require("./user.route.js");
var carRouter = require("./car.route.js");

router.use("/users", userRouter);
router.use("/cars", carRouter);

module.exports = router;
