const multer = require("multer");
const uuid = require("uuid").v4;

const discountStorage = multer.diskStorage({
   destination: "public/images/discount/",
   filename: (req, file, cb) => {
      cb(null, `discount-image-${uuid()}.jpg`);
   },
});

const uploadDiscountFormData = multer({ storage: discountStorage }).single(
   "image"
);

module.exports = { uploadDiscountFormData };
