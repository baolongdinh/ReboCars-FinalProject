const discountService = require('../services/discount.service');
const { respondOK } = require('../helpers/respond.helper');

const discountController = {
    addNewDiscount: async (req, res, next) => {
        await discountService.addDiscount(req, res).catch((err) => {
            next(err);
        });
    },

    getAllDiscount: async (req, res, next) => {
        await discountService
            .getAllDiscount(req.query)
            .then((discounts) => {
                respondOK(res, { discounts }, 'get list discounts success', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    // findDiscountById: async (req, res, next) => {
    //     await discountService
    //         .findDiscountById(req.params.id)
    //         .then((car) => {
    //             respondOK(res, { car }, "get car success", 200);
    //         })
    //         .catch((err) => {
    //             next(err);
    //         });
    // },

    deleteDiscountById: async (req, res, next) => {
        await discountService
            .deleteDiscountById(req.params.id)
            .then(() => {
                respondOK(res, null, 'Deleted discount successfully', 203);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateDiscountById: async (req, res, next) => {
        await discountService
            .updateDiscountById(req.params.id, req.body)

            .catch((err) => {
                next(err);
            });
    },

    updateDiscountImageById: async (req, res, next) => {
        await discountService
            .updateDiscountImageById(req.params.id, req, res)

            .catch((err) => {
                next(err);
            });
    },
    findDiscountsFilterWithRegexString: async (req, res, next) => {
        await discountService
            .findDiscountsFilterWithRegexString(req.query)
            .then((data) => {
                respondOK(res, data, 'get list discounts success', 200);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = discountController;
