const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  price_sale: { type: Number, default: 0 },
  type: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  image: { type: String },
  is_featured: { type: Boolean, default: false },
  featured_type: {
    type: String,
    enum: ["new", "trend", "top", "default"],
    default: "default"
  },
  created_at: { type: Date, default: Date.now },
  description: { type: String },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
