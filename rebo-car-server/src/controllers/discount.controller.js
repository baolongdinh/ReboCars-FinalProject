const discountService = require("../services/discount.service");
const { respondOK } = require("../helpers/respond.helper");

const discountController = {
    addNewDiscount: async (req, res, next) => {
        await discountService
            .addDiscount(req, res)
            .then((discount) => {
                respondOK(
                    res,
                    { discount },
                    "add new discount successfully",
                    201
                );
            })
            .catch((err) => {
                next(err);
            });
    },

    getAllDiscount: async (req, res, next) => {
        await discountService
            .getAllDiscount(req.query)
            .then((discount) => {
                respondOK(res, { discount }, "get list discounts success", 200);
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
                respondOK(res, null, "Deleted discount successfully", 203);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateDiscountById: async (req, res, next) => {
        await discountService
            .updateDiscountById(req.params.id, req.body)
            .then((updatedDiscount) => {
                respondOK(
                    res,
                    { updatedDiscount },
                    "update discount successfully",
                    200
                );
            })
            .catch((err) => {
                next(err);
            });
    },

    updateDiscountImageById: async (req, res, next) => {
        await discountService
            .updateDiscountImageById(req.params.id, req, res)
            .then((newDiscountImage) => {
                respondOK(
                    res,
                    { newDiscountImage },
                    "update discount image successfully",
                    200
                );
            })
            .catch((err) => {
                next(err);
            });
    },
};

module.exports = discountController;
