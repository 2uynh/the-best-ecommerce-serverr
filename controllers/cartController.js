const CartItem = require("../models/cartItem");

exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body; // Nhận dữ liệu từ client

  try {
    // Tìm giỏ hàng chưa thanh toán của người dùng
    const existingCartItem = await CartItem.findOne({
      user_id,        // ID người dùng
      product_id,     // ID sản phẩm
      is_paid: false,  // Chỉ tìm sản phẩm trong giỏ chưa thanh toán
    });

    if (existingCartItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      existingCartItem.quantity += quantity || 1;  // Tăng số lượng sản phẩm (mặc định 1 nếu không có quantity)
      await existingCartItem.save();  // Lưu lại giỏ hàng đã cập nhật
      return res.status(200).json({
        msg: "Sản phẩm đã có trong giỏ hàng, số lượng đã được cập nhật.",
        item: existingCartItem,
      });
    }

    // Nếu sản phẩm chưa có trong giỏ, tạo mới một item trong giỏ
    const newCartItem = new CartItem({
      user_id,       // ID người dùng
      product_id,    // ID sản phẩm
      quantity: quantity || 1,  // Số lượng (mặc định 1 nếu không có quantity)
      is_paid: false, // Giỏ hàng chưa thanh toán
    });

    await newCartItem.save();  // Lưu item mới vào giỏ hàng
    res.status(201).json({
      msg: "Sản phẩm đã được thêm vào giỏ hàng.",
      item: newCartItem,
    });

  } catch (err) {
    console.error("Lỗi khi thêm vào giỏ hàng:", err);
    res.status(500).json({ msg: "Lỗi server khi thêm sản phẩm vào giỏ hàng" });
  }
};

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    const cartItems = await CartItem.find({ user_id: userId }).populate("product_id");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
//xoa 
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await CartItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ msg: "Sản phẩm không tồn tại trong giỏ hàng" });
    }

    res.status(200).json({ msg: "Sản phẩm đã được xóa khỏi giỏ hàng" });
  } catch (err) {
    console.error("Lỗi khi xóa sản phẩm:", err);
    res.status(500).json({ msg: "Lỗi từ máy chủ" });
  }
};




exports.increaseQuantity = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });

    cartItem.quantity += 1;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}

exports.decreaseQuantity = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.json(cartItem);
    } else {
      // Optionally xóa sản phẩm nếu quantity <= 1
      await Cart.findByIdAndDelete(req.params.id);
      res.json({ message: 'Đã xóa sản phẩm khỏi giỏ hàng vì số lượng = 0' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err });
  }
}