const CartItem = require("../models/cartItem");

exports.addToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    const newCartItem = new CartItem({ user_id, product_id, quantity });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getCartItems = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartItem.find({ user_id: userId }).populate("product_id");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await CartItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ msg: "Item not found" });
    res.status(200).json({ msg: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
