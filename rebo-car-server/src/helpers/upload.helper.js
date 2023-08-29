const multer = require("multer");
const uuid = require("uuid").v4;

const userStorage = multer.diskStorage({
  destination: "public/images/users/",
  filename: (req, file, cb) => {
    cb(null, `user-avtImage-${uuid()}.jpg`);
  },
});

const uploadUserFormData = multer({ userStorage }).single("avatar");

module.exports = {
  uploadUserFormData,
};
