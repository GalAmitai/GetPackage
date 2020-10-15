const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const ErrorHandler = require('./../services/ErrorHandler');
const AuthMiddleware = require('./../middlewares/auth');

router.post('/login', AuthMiddleware.login , async (req, res) => {
    try {
        const response = await AuthController.verifyAuthentication(req);
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