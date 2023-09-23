const { respondOK } = require("../helpers/respond.helper");
const roleServices = require("../services/role.service");

const roleControllers = {
    addRole: async (req, res, next) => {
        roleServices
            .addRole(req.body)
            .then((data) => {
                respondOK(res, data, "add new role successfully", 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    getAllRoles: async (req, res, next) => {
        roleServices
            .getAllRoles()
            .then((data) => {
                respondOK(res, data, "get all roles successfully", 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    updateRoleById: async (req, res, next) => {
        roleServices
            .updateRoleById(req.params.id, req.body)
            .then((data) => {
                respondOK(res, data, "updated role successfully", 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    updatePermissionByRoleId: async (req, res, next) => {
        roleServices
            .updatePermissionRoleById(req.params.id, req.body)
            .then((data) => {
                respondOK(res, data, "updated role successfully", 201);
            })
            .catch((err) => {
                next(err);
            });
    },
    deleteRoleById: async (req, res, next) => {
        roleServices
            .deleteRoleById(req.params.id)
            .then(() => {
                respondOK(res, null, "delete role successfully", 201);
            })
            .catch((err) => {
                next(err);
            });
    },
};

module.exports = roleControllers;
