const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct, getFeaturedProducts } = require("../controllers/productController");
const { verifyAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

// Product Routes
router.post("/", verifyAdmin, createProduct);
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

module.exports = router;
