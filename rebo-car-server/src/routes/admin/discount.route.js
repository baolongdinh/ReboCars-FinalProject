var express = require("express");
var router = express.Router();
const discountController = require("../../controllers/discount.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
/* GET users listing. */
const defineEndpoint = (req, res, next) => {
    req.endpoint = "discounts";
    next();
};

router.delete(
    "/:id",
    defineEndpoint,
    authMiddleware.checkPermission,
    discountController.deleteDiscountById
);

router.put(
    "/:id",
    defineEndpoint,
    authMiddleware.checkPermission,
    discountController.updateDiscountById
);

router.patch(
    "/:id",
    defineEndpoint,
    authMiddleware.checkPermission,
    discountController.updateDiscountImageById
);

router.post(
    "/",
    defineEndpoint,
    authMiddleware.checkPermission,
    discountController.addNewDiscount
);

module.exports = router;
