var express = require("express");
var router = express.Router();
const carController = require("../controllers/car.controller");

const middleWaresFunc = (req, res, next) => {
  console.log(req.method);
  next();
};

/* GET users listing. */
router.get("/", middleWaresFunc, carController.getAllCars);

router.post("/", carController.addNewCar);

router.get("/userCars/:id", carController.getAllUserCars);

router.delete("/:id", carController.deleteCarById);

router.delete("/userCars/:id", carController.deleteAllUserCars);

router.put("/:id", carController.updateCarById);

router.patch("/carImages/:id", carController.updateCarImagesById);

module.exports = router;
