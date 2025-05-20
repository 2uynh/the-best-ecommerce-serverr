const express = require('express');
const router = express.Router();
const changePasswordController = require('../controllers/changePassController');
const authMiddleware = require('../middlewares/verifyToken'); // Middleware xác thực (JWT)

// Route: POST /api/users/change-password
router.post('/', authMiddleware.verifyCustomer, changePasswordController.changePassword);

module.exports = router;
