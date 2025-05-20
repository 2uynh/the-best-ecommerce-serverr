const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Giới hạn tối thiểu số lượng là 1
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
