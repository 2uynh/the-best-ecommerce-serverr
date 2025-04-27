const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your_db_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to DB"))
  .catch(err => console.error("DB connection error:", err));

const FEATURED_TYPES = ['new', 'trend', 'top'];
const DEVICE_NAMES = [
  'MacBook Air M1', 'MacBook Pro M2', 'Dell XPS 13', 'HP Spectre x360',
  'Asus ROG Strix', 'Lenovo ThinkPad X1', 'iPhone 15', 'Samsung Galaxy S23',
  'iPad Pro 2023', 'Sony WH-1000XM5', 'Apple Watch Series 9',
  'Samsung Galaxy Watch 5', 'Canon EOS R7', 'DJI Mini 3 Pro', 'Logitech MX Master 3S',
  'AirPods Pro 2', 'Google Pixel 8', 'Nintendo Switch OLED', 'MSI Katana GF66',
  'Huawei MateBook X', 'Razer Blade 15', 'Beats Studio Buds', 'LG Gram 17',
  'Acer Swift X', 'Xbox Series X', 'PlayStation 5', 'GoPro Hero 12', 'Kindle Paperwhite',
  'Realme Pad X', 'OnePlus 12R'
];

async function seedProducts() {
  try {
    const categories = await Category.find();
    if (!categories.length) throw new Error("Bạn cần tạo ít nhất một category trước");

    await Product.deleteMany(); // Clear existing products

    const productsToInsert = DEVICE_NAMES.map((name, index) => {
      const isFeatured = index < 15;
      console.log({index, isFeatured})
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      return {
        name,
        price: Math.floor(Math.random() * 20000000 + 5000000), // 5tr - 25tr
        price_sale: Math.floor(Math.random() * 3000000),        // Giảm giá ngẫu nhiên
        featured_type: FEATURED_TYPES[index % FEATURED_TYPES.length],
        is_featured: isFeatured,
        category_id: randomCategory._id,
        image: `https://picsum.photos/200/300?random=${index}`,
        created_at: new Date()
      };
    });

    await Product.insertMany(productsToInsert);
    console.log("✅ Đã seed thành công 30 sản phẩm!");
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi khi seed dữ liệu:", err);
    process.exit(1);
  }
}

seedProducts();
