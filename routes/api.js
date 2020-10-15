const express = require('express');
const router = express.Router();
const ErrorHandler = require('./../services/ErrorHandler');
const { verifyJWTToken } = require('./../middlewares/jwt');
const DeliveryMiddleware = require('./../middlewares/delivery');
const DeliveryController = require('./../controllers/DeliveryController');

router.post('/addDelivery', [verifyJWTToken, DeliveryMiddleware.addDelivery] , async (req, res) => {
    try {
        const response = await DeliveryController.addDelivery(req);
        res.status(response.status).json({
            status: response.status,
            data: response.data
        });
    } catch (err) {
        ErrorHandler.error(err);
        res.status(500).json(err);
    }
});

router.get('/getDeliveries', [verifyJWTToken, DeliveryMiddleware.getDeliveries] , async (req, res) => {
    try {
        const response = await DeliveryController.getDeliveries(req);
        res.status(response.status).json({
            status: response.status,
            data: response.data
        });
    } catch (err) {
        ErrorHandler.error(err);
        res.status(500).json(err);
    }
});

router.post('/assignDelivery', [verifyJWTToken, DeliveryMiddleware.assignDelivery] , async (req, res) => {
    try {
        const response = await DeliveryController.assignDelivery(req);
        res.status(response.status).json({
            status: response.status,
            data: response.data
        });
    } catch (err) {
        ErrorHandler.error(err);
        res.status(500).json(err);
    }
});

router.get('/courierRevenue', [verifyJWTToken, DeliveryMiddleware.courierRevenue] , async (req, res) => {
    try {
        const response = await DeliveryController.courierRevenue(req);
        res.status(response.status).json({
            status: response.status,
            data: response.data
        });
    } catch (err) {
        ErrorHandler.error(err);
        res.status(500).json(err);
    }
});
module.exports = router;