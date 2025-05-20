const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");

require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/your_db_name",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB connection error:", err));

const FEATURED_TYPES = ["new", "trend", "top"];

const DEVICE_NAMES = [
  // 💻 Laptop
  "MacBook Air M2",
  "Dell XPS 13",
  "HP Spectre x360",
  "Asus ROG Strix G16",
  "Lenovo ThinkPad X1",
  "MSI Katana GF66",
  "LG Gram 17",
  "Acer Swift X",
  "Razer Blade 15",
  "Huawei MateBook X",

  // 📱 Phone
  "iPhone 15 Pro",
  "Samsung Galaxy S23",
  "Google Pixel 8 Pro",
  "OnePlus 12R",
  "Realme Pad X",
  "iPad Pro 2023",
  "Samsung Galaxy Z Flip5",
  "Xiaomi 13T Pro",
  "Vivo X100",
  "Asus ROG Phone 7",

  // 🎧 Headphone
  "Sony WH-1000XM5",
  "AirPods Pro 2",
  "Beats Studio Buds",
  "JBL Tune 760NC",
  "Sennheiser Momentum 4",

  // ⌚ Watch
  "Apple Watch Series 9",
  "Samsung Galaxy Watch 6",
  "Amazfit GTS 4",
  "Garmin Venu 2",
  "Huawei Watch GT 4",

  // 🖱️ Mouse
  "Logitech MX Master 3S",
  "Razer Basilisk V3",
  "Microsoft Surface Mouse",
  "Corsair Dark Core RGB Pro",
  "SteelSeries Rival 5",
];

function getCategoryIdByName(name, categories) {
  const lowerName = name.toLowerCase();

  if (
    lowerName.includes("macbook") ||
    lowerName.includes("dell") ||
    lowerName.includes("hp") ||
    lowerName.includes("asus") ||
    lowerName.includes("thinkpad") ||
    lowerName.includes("matebook") ||
    lowerName.includes("razer blade") ||
    lowerName.includes("gram") ||
    lowerName.includes("msi") ||
    lowerName.includes("acer") ||
    lowerName.includes("swift")
  ) {
    return categories.find((cat) => cat.name === "laptop")?._id;
  }

  if (
    lowerName.includes("iphone") ||
    lowerName.includes("galaxy") ||
    lowerName.includes("pixel") ||
    lowerName.includes("oneplus") ||
    lowerName.includes("realme") ||
    lowerName.includes("xiaomi") ||
    lowerName.includes("ipad") ||
    lowerName.includes("vivo") ||
    lowerName.includes("rog phone")
  ) {
    return categories.find((cat) => cat.name === "phone")?._id;
  }

  if (
    lowerName.includes("sony") ||
    lowerName.includes("airpods") ||
    lowerName.includes("beats") ||
    lowerName.includes("headphone") ||
    lowerName.includes("jbl") ||
    lowerName.includes("sennheiser") ||
    lowerName.includes("momentum")
  ) {
    return categories.find((cat) => cat.name === "headphone")?._id;
  }

  if (
    lowerName.includes("watch") ||
    lowerName.includes("amazfit") ||
    lowerName.includes("garmin") ||
    lowerName.includes("venu") ||
    lowerName.includes("gt")
  ) {
    return categories.find((cat) => cat.name === "watch")?._id;
  }

  if (
    lowerName.includes("logitech") ||
    lowerName.includes("mouse") ||
    lowerName.includes("chuột") ||
    lowerName.includes("mx master") ||
    lowerName.includes("surface") ||
    lowerName.includes("corsair") ||
    lowerName.includes("steelseries") ||
    lowerName.includes("basilisk")
  ) {
    return categories.find((cat) => cat.name === "mouse")?._id;
  }

  return categories[0]._id;
}

async function seedProducts() {
  try {
    const categories = await Category.find();
    if (!categories.length)
      throw new Error("Bạn cần tạo ít nhất một category trước");

    await Product.deleteMany(); // Xóa sản phẩm cũ

    const productsToInsert = DEVICE_NAMES.map((name, index) => {
      const isFeatured = index < 15;
      const categoryId = getCategoryIdByName(name, categories);

      return {
        name,
        price: Math.floor(Math.random() * 20000000 + 5000000),
        price_sale: Math.floor(Math.random() * 3000000),
        featured_type: FEATURED_TYPES[index % FEATURED_TYPES.length],
        is_featured: isFeatured,
        category_id: categoryId,
        image: `https://picsum.photos/200/300?random=${index}`,
        created_at: new Date(),
      };
    });

    await Product.insertMany(productsToInsert);
    console.log("✅ Đã seed thành công sản phẩm!");
    process.exit();
  } catch (err) {
    console.error("❌ Lỗi khi seed dữ liệu:", err);
    process.exit(1);
  }
}

seedProducts();
