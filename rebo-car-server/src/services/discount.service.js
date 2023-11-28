const discountModel = require('../models/discount.model');
const { respondOK, respondFailure } = require('../helpers/respond.helper');
const multer = require('multer');
const { uploadDiscountFormData } = require('../middlewares/multer/discountImageUpload');
var {
    BadRequestError,
    UnAuthorizedError,
    ForbiddenError,
    NotfoundError,
    InternalServerError
} = require('../core/error.response');

const { deleteImageOfDiscount } = require('../helpers/helperFunc');
// {
//     discount_name: { type: String, require: true },
//     discount_image: { type: String, require: true },
//     discount_description: { type: String, require: true },
//     discount_value: { type: Number, require: true },
//     discount_code: { type: String, require: true },
//     discount_start_date: { type: Date, require: true },
//     discount_end_date: { type: Date, require: true },
//     discount_max_uses: { type: Number, require: true },
//     discount_uses_count: { type: Number, default: 0 },
//     discount_users_used: { type: Array, default: [] },
//     discount_active: { type: Array, default: true },
//  },

const discountSelectField = {
    // select field to get with 1 and disable with 0
};

const discountServices = {
    getAllDiscount: async ({ limit, sort = 'ctime', page, filter, select = discountSelectField }) => {
        limit = parseInt(limit) || 0;
        page = parseInt(page) || 0;

        const skip = (page - 1) * limit;
        const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };

        if (!filter) {
            filter = JSON.stringify({});
        }

        const discounts = await discountModel
            .find(JSON.parse(filter))
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .select(select)
            .lean();

        if (!discounts) {
            throw new NotfoundError('Invalid value');
        }
        return discounts;
    },
    addDiscount: async (req, res) => {
        uploadDiscountFormData(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return respondFailure(res, 'Multer error occurred when uploading', 401);
                // A Multer error occurred when uploading.
            } else if (err) {
                return respondFailure(res, 'Internal error', 500);
            }
            // Everything went fine

            const {
                discount_name,
                discount_description,
                discount_value,
                discount_code,
                discount_start_date,
                discount_end_date,
                discount_max_uses
            } = req.body;

            if (!discount_name) {
                return respondFailure(res, 'invalid value', 403);
            }

            const discountImagePath = `/static/images/discounts/${req.file.filename}`;

            const newDiscount = await discountModel
                .create({
                    discount_name,
                    discount_description,
                    discount_image: discountImagePath,
                    discount_value,
                    discount_code,
                    discount_start_date,
                    discount_end_date,
                    discount_max_uses
                })
                .catch((err) => {
                    throw new InternalServerError(err.message);
                });

            return respondOK(res, newDiscount, 'create discount successfully', 201);
        });
    },
    updateDiscountById: async (id, req, res) => {
        uploadDiscountFormData(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return respondFailure(res, 'Multer error occurred when uploading', 401);
                // A Multer error occurred when uploading.
            } else if (err) {
                return respondFailure(res, 'Internal error', 500);
            }
            // Everything went fine
            try {
                const {
                    discount_name,
                    discount_description,
                    discount_value,
                    discount_code,
                    discount_start_date,
                    discount_end_date
                } = req.body;

                const existedDiscount = await discountModel.findById(id);

                if (!existedDiscount) {
                    throw new BadRequestError('can not found discount id');
                }

                if (req.file) {
                    existedDiscount.discount_image = `/static/images/discounts/${req.file.filename}`;
                }
                existedDiscount.discount_name = discount_name;
                existedDiscount.discount_description = discount_description;
                existedDiscount.discount_value = discount_value;
                existedDiscount.discount_code = discount_code;
                existedDiscount.discount_start_date = discount_start_date;
                existedDiscount.discount_end_date = discount_end_date;
                await existedDiscount.save();

                return respondOK(res, existedDiscount, 'updated discount successfully', 201);
            } catch (error) {
                throw new BadRequestError(error.message);
            }
        });
    },

    updateDiscountImageById: async (id, req, res) => {
        uploadDiscountFormData(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return respondFailure(res, 'Multer error occurred when uploading', 401);
                // A Multer error occurred when uploading.
            } else if (err) {
                return respondFailure(res, 'Internal error', 500);
            }
            // Everything went fine

            const existedDiscount = await discountModel.findById(id);

            if (!existedDiscount) {
                throw new BadRequestError('can not found discount id');
            }

            deleteImageOfDiscount(existedDiscount);

            existedDiscount.discount_image = `/static/images/discounts/${req.file.filename}`;

            existedDiscount.save().catch((err) => {
                throw new InternalServerError(err.message);
            });

            return respondOK(res, existedDiscount, 'updated discount image successfully', 201);
        });
    },
    deleteDiscountById: async (id) => {
        const existedDiscount = await discountModel.findById(id).lean();

        if (!existedDiscount) {
            throw new BadRequestError('can not found discount id');
        }

        discountModel.findByIdAndDelete(id).catch((err) => {
            throw new InternalServerError(err.message);
        });
    },

    activeOrBlockDiscountById: async (id) => {
        try {
            const existedDiscount = await discountModel.findById(id);

            if (!existedDiscount) {
                throw new BadRequestError('can not found discount id');
            }

            existedDiscount.discount_active = !existedDiscount.discount_active;
            await existedDiscount.save();

            return existedDiscount;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    findDiscountsFilterWithRegexString: async ({
        limit = 6,
        page = 1,
        matchString = '',
        sort = {
            createdAt: -1
        }
    }) => {
        try {
            const skip = (page - 1) * parseInt(limit);
            const discounts = await discountModel.aggregate([
                {
                    $match: {
                        $or: [
                            { discount_code: { $regex: matchString, $options: 'i' } },
                            { discount_name: { $regex: matchString, $options: 'i' } }
                        ]
                    }
                },
                { $sort: sort },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);

            if (!discounts) {
                throw new NotfoundError('Invalid value');
            }

            const totalDiscounts = await discountModel.countDocuments();

            const data = {
                totalDiscounts,
                discounts
            };
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};

module.exports = discountServices;
