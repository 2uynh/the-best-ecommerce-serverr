const Order = require("../models/order");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  try {
    const { customer, products } = req.body;

    // Tính tổng tiền và lưu giá tại thời điểm đặt hàng
    let totalAmount = 0;
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        console.log(product)
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        return {
          product_id: product._id, 
          name: product.name, 
          quantity: item.quantity,
          price_at_order_time: product.price
        };
      })
    );

    const order = new Order({
      customer,
      products: productDetails,
      totalAmount
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email address")

    const ordersWithQuantity = orders.map(order => {
      return {
        ...order.toObject(),
        products: order.products.map(item => ({
          ...item.toObject(),
          quantity: item.quantity  // Thêm số lượng vào sản phẩm
        }))
      };
    });

    res.json(ordersWithQuantity);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email address")
      .populate("products.product", "name price");

    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error: err.message });
  }
};

// Cập nhật đơn hàng
exports.updateOrder = async (req, res) => {
  try {
    const { products, status, customer } = req.body;

    // Tìm đơn hàng theo ID
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    // Cập nhật sản phẩm nếu có
    if (products) {
      let totalAmount = 0;
      const updatedProducts = await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.productId);
          if (!product) {
            throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);
          }
          const itemTotal = product.price * item.quantity;
          totalAmount += itemTotal;

          return {
            product_id: product._id, 
            name: product.name, 
            quantity: item.quantity,
            price_at_order_time: product.price
          };
        })
      );

      // Cập nhật lại sản phẩm và tổng tiền
      order.products = updatedProducts;
      order.totalAmount = totalAmount;
      order.customer = customer;
    }

    // Cập nhật trạng thái nếu có
    if (status) {
      order.status = status;
    }

    // Lưu lại đơn hàng đã cập nhật
    await order.save();

    // Trả lại đơn hàng đã cập nhật
    res.json(order);
  } catch (err) {
    console.error('Error in updateOrder:', err.message); // In ra lỗi chi tiết
    res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng", error: err.message });
  }
};


// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ message: "Đơn hàng đã bị xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng", error: err.message });
  }
};
