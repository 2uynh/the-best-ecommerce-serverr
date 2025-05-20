const express = require("express");
const router = express.Router();
const changePasswordController = require("../controllers/changePasswordController");
const authMiddleware = require("../middlewares/authMiddleware"); // middleware xác thực

// POST /api/users/change-password
router.post("/change-password", authMiddleware, changePasswordController.changePassword);

module.exports = router;
