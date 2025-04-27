const express = require("express");
const { createSale, getSales } = require("../controllers/saleController");
const router = express.Router();

// Sale Routes
router.post("/", createSale);
router.get("/", getSales);

module.exports = router;
