var express = require('express');
var router = express.Router();
const discountController = require('../../controllers/discount.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
/* GET users listing. */
const defineEndpoint = (req, res, next) => {
    req.endpoint = 'discounts';
    next();
};

router.delete('/:id', defineEndpoint, discountController.deleteDiscountById);

router.put('/:id', defineEndpoint, discountController.updateDiscountById);

router.put('/activeOrBlock/:id', defineEndpoint, discountController.activeOrBlockDiscountById);

router.patch(
    '/:id',
    defineEndpoint,

    discountController.updateDiscountImageById
);

router.post('/', defineEndpoint, discountController.addNewDiscount);

module.exports = router;
