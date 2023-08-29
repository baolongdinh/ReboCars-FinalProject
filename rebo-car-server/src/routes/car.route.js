var express = require("express");
var router = express.Router();
const carController = require("../controllers/car.controller");

/* GET users listing. */
router.get("/", carController.getAllCars);

router.post("/", carController.addNewCar);

router.get("/userCars/:id", carController.getAllUserCars);

router.delete("/:id", carController.deleteCarById);

router.delete("/userCars/:id", carController.deleteAllUserCars);

module.exports = router;
