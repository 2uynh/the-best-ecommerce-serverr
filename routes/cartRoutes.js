const express = require("express");
const { addToCart, getCartItems, removeFromCart, increaseQuantity, decreaseQuantity } = require("../controllers/cartController");
const router = express.Router();

// Route để thêm sản phẩm vào giỏ hàng
router.post("/", addToCart);

// Route để lấy tất cả sản phẩm trong giỏ hàng của người dùng
router.get("/:userId", getCartItems);

// Route để xóa sản phẩm khỏi giỏ hàng
router.delete("/:id", removeFromCart);

// Tăng số lượng
router.put('/increase/:id', increaseQuantity);

// Giảm số lượng
router.put('/decrease/:id', decreaseQuantity);


module.exports = router;
