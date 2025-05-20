const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/checkoutController");

// Route tạo đơn hàng
router.post("/", placeOrder);

module.exports = router;
