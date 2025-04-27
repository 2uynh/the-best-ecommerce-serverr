const Order = require("../models/order");
const CartItem = require("../models/cartItem");

exports.createOrder = async (req, res) => {
  const { user_id, total_amount } = req.body;
  try {
    const order = new Order({ user_id, total_amount, payment_status: "pending" });
    await order.save();

    const cartItems = await CartItem.find({ user_id });
    cartItems.forEach(async (item) => {
      const orderItem = {
        order_id: order._id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_id.price,
      };
      // Add logic to save orderItem to database
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user_id: userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
