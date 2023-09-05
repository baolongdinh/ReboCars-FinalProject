var express = require("express");
var router = express.Router();
const carRouter = require("./car.route");
const userRouter = require("./user.route");
const roleRouter = require("./role.route");

router.use("/cars", carRouter);
router.use("/users", userRouter);
router.use("/roles", roleRouter);

module.exports = router;
