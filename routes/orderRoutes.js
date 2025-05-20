const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyAdmin } = require("../middlewares/verifyToken");

router.post("/", verifyAdmin, orderController.createOrder);
router.get("/", verifyAdmin, orderController.getAllOrders);
router.get("/:id", verifyAdmin, orderController.getOrderById);
router.put("/:id", verifyAdmin, orderController.updateOrder);
router.delete("/:id", verifyAdmin, orderController.deleteOrder);

module.exports = router;
