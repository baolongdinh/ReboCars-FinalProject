const { respondOK } = require('../helpers/respond.helper');
const orderServices = require('../services/order.service');

const orderControllers = {
    getAllOrders: async (req, res, next) => {
        orderServices
            .getAllOrders(req.query)
            .then((data) => {
                respondOK(res, data, 'get all orders successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    getAllUserOrders: async (req, res, next) => {
        console.log(req.body);
        orderServices
            .getAllUserOrders(req.query, req.body)
            .then((data) => {
                respondOK(res, data, 'get all user orders successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    createOrder: async (req, res, next) => {
        orderServices
            .createOrder(req.body)
            .then((data) => {
                respondOK(res, data, 'create new order successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },

    updateOrderById: async (req, res, next) => {
        orderServices
            .updateOrderById(req.params.id, req.body)
            .then((data) => {
                respondOK(res, data, 'updated order successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    deleteOrderById: async (req, res, next) => {
        orderServices
            .deleteOrderById(req.params.id)
            .then(() => {
                respondOK(res, null, 'delete order successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    reviewOrderById: async (req, res, next) => {
        orderServices
            .reviewOrderById(req.params.id, req.body)
            .then(() => {
                respondOK(res, null, 'add review to order successfully', 200);
            })
            .catch((err) => {
                next(err);
            });
    },
    loadOrderStatics: async (req, res, next) => {
        console.log(req.query);
        orderServices
            .loadTotalOrderStatics(req.query)
            .then((orders) => {
                respondOK(res, { orders }, 'get orders success', 200);
            })
            .catch((err) => {
                next(err);
            });
    }
};

module.exports = orderControllers;
