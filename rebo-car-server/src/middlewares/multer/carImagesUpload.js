const multer = require("multer");
const uuid = require("uuid").v4;

const carStorage = multer.diskStorage({
  destination: "public/images/cars/",
  filename: (req, file, cb) => {
    cb(null, `car-image-${uuid()}.jpg`);
  },
});

const uploadCarImageFormData = multer({ storage: carStorage }).array(
  "images",
  4
);

module.exports = uploadCarImageFormData;
