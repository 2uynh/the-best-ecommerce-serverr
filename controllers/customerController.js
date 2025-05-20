const bcrypt = require("bcryptjs");
const Customer = require("../models/user");

// Lấy danh sách tất cả khách hàng
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ role: "customer" });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khách hàng" });
  }
};

// Thêm khách hàng mới
exports.createCustomer = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newCustomer = new Customer({ ...req.body, password: hashedPassword });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    clgx
    res.status(400).json({ message: "Không thể tạo khách hàng", error });
  }
};

// Cập nhật khách hàng
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Không thể cập nhật khách hàng", error });
  }
};

// Xoá khách hàng
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy khách hàng" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Không thể xoá khách hàng", error });
  }
};
