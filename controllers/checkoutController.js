const Order = require('../models/order');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ msg: 'Thiếu user_id' });
    }

    // Lấy giỏ hàng
    const cartItems = await CartItem.find({ user_id }).populate('product_id');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ msg: 'Giỏ hàng rỗng' });
    }

    // Tính tổng tiền và chuẩn bị danh sách sản phẩm
    let totalAmount = 0;
    const products = [];

    cartItems.forEach((item) => {
      if (item.product_id) {
        const price = item.product_id.price || 0;
        const quantity = item.quantity || 1;
        totalAmount += price * quantity;

        products.push({
          product_id: item.product_id._id,
          name: item.product_id.name,
          quantity: quantity,
          price_at_order_time: price, 
        });
      }
    });

    // Tạo đơn hàng
    const order = new Order({
      customer: user_id,
      products,
      totalAmount,
      payment_status: 'pending',
    });

    await order.save();

    // Xóa giỏ hàng
    await CartItem.deleteMany({ user_id });

    return res.status(201).json({ msg: 'Đặt hàng thành công', order });
  } catch (err) {
    console.error('Lỗi khi tạo đơn hàng:', err);
    return res.status(500).json({ msg: 'Lỗi máy chủ', error: err.message });
  }
};

