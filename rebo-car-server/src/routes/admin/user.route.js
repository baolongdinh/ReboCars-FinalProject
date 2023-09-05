var express = require("express");
var router = express.Router();
const userController = require("../../controllers/user.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
/* GET users listing. */
const defineEndpoint = (req, res, next) => {
  req.endpoint = "userCars";
  next();
};

router.delete(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  userController.deleteUserById
);

router.put(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  userController.updateUserByIdByAdmin
);

module.exports = router;
