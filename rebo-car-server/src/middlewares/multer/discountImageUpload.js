const multer = require('multer');
const uuid = require('uuid').v4;

const discountStorage = multer.diskStorage({
    destination: 'public/images/discounts/',
    filename: (req, file, cb) => {
        cb(null, `discount-image-${uuid()}.jpg`);
    }
});

const uploadDiscountFormData = multer({ storage: discountStorage }).single('discount_image');

module.exports = { uploadDiscountFormData };
