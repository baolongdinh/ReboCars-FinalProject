var express = require("express");
var router = express.Router();
const roleController = require("../../controllers/role.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
/* GET users listing. */
const defineEndpoint = (req, res, next) => {
  req.endpoint = "userCars";
  next();
};

router.get(
  "/",
  defineEndpoint,
  authMiddleware.checkPermission,
  roleController.getAllRoles
);

router.put(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  roleController.updateRoleById
);

router.post(
  "/",
  defineEndpoint,
  authMiddleware.checkPermission,
  roleController.addRole
);

router.delete(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  roleController.deleteRoleById
);

router.patch(
  "/:id",
  defineEndpoint,
  authMiddleware.checkPermission,
  roleController.updatePermissionByRoleId
);

module.exports = router;
