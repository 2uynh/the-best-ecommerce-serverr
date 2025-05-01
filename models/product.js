const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String },
  is_featured: { type: Boolean, default: false },
  featured_type: { type: String, enum: ["sale", "new"], default: null },
  description: { type: String, default: "" },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
