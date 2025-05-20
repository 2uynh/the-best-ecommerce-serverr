// controllers/changePassController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy user từ middleware xác thực (authMiddleware)
    const { currentPassword, newPassword } = req.body;

    // Lấy người dùng từ DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
    }

    // Mã hóa mật khẩu mới và lưu vào DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đổi mật khẩu', error });
  }
};
