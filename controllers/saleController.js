const Sale = require("../models/sale");

exports.createSale = async (req, res) => {
  const { product_id, discount_percentage, start_date, end_date } = req.body;
  try {
    const newSale = new Sale({ product_id, discount_percentage, start_date, end_date });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("product_id");
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
