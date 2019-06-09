const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// Import the order controller
const OrdersController = require('../controllers/orders');

// Handle the different types of requests using the order controller

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;