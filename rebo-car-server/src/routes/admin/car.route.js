var express = require("express");
var router = express.Router();
const carController = require("../../controllers/car.controller");
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
  carController.deleteCarById
);

router.put(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  carController.updateCarById
);




module.exports = router;
