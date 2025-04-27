const express = require("express");
const { createCategory, getCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const verifyAdmin = require("../middlewares/verifyToken");
const router = express.Router();

// Category Routes
router.post("/", verifyAdmin, createCategory);
router.get("/", getCategories);
router.put("/:id", verifyAdmin, updateCategory);
router.delete("/:id", verifyAdmin, deleteCategory);

module.exports = router;
    