const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  total_amount: { type: Number, required: true },
  payment_status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  created_at: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
