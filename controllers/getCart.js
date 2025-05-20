const CartItem = require("../models/cartItem");
const Product = require("../models/product");

exports.getCartWithProducts = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    // Lấy các item trong giỏ hàng của người dùng (giỏ hàng chưa thanh toán)
    const cartItems = await CartItem.find({ user_id: userId, is_paid: false }).populate('product_id'); // Tự động lấy thông tin sản phẩm từ product_id
    
    // Nếu giỏ hàng trống
    if (cartItems.length === 0) {
        return res.status(404).json({ msg: "Giỏ hàng của bạn đang trống" });
        }

    // Trả về danh sách sản phẩm trong giỏ hàng
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm trong giỏ hàng:", error);
    res.status(500).json({ msg: "Lỗi khi lấy sản phẩm trong giỏ hàng" });
  }
};
