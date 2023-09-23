var express = require("express");
var router = express.Router();

const discountController = require("../controllers/discount.controller");

router.get("/", discountController.getAllDiscount);

module.exports = router;
