const mongoose = require("mongoose");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Sale = require("../models/sale");

require("dotenv").config();

// Kết nối với MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  seedDatabase();
})
.catch((err) => console.log("MongoDB connection error:", err));

const seedDatabase = async () => {
  try {
    // Xoá tất cả các collection hiện tại
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Sale.deleteMany();

    // Chèn mockup dữ liệu
    const categories = [
      { name: "Laptops" },
      { name: "Desktops" },
      { name: "Accessories" },
      { name: "PC Components" }
    ];

    // Insert categories vào MongoDB
    const insertedCategories = await Category.insertMany(categories);
    console.log("Categories inserted:", insertedCategories);

    const products = [
      {
        name: "MacBook Pro 16-inch",
        price: 2500,
        price_sale: 2300,
        type: "Laptop",
        category_id: insertedCategories.find(cat => cat.name === "Laptops")._id,
        image: "https://via.placeholder.com/150?text=MacBook+Pro",
        created_at: new Date(),
      },
      {
        name: "Dell XPS 13",
        price: 1800,
        price_sale: 1700,
        type: "Laptop",
        category_id: insertedCategories.find(cat => cat.name === "Laptops")._id,
        image: "https://via.placeholder.com/150?text=Dell+XPS",
        created_at: new Date(),
      },
      {
        name: "HP Pavilion Desktop",
        price: 600,
        price_sale: 550,
        type: "Desktop",
        category_id: insertedCategories.find(cat => cat.name === "Desktops")._id,
        image: "https://via.placeholder.com/150?text=HP+Pavilion",
        created_at: new Date(),
      },
      {
        name: "Logitech MX Master 3 Mouse",
        price: 100,
        price_sale: 85,
        type: "Mouse",
        category_id: insertedCategories.find(cat => cat.name === "Accessories")._id,
        image: "https://via.placeholder.com/150?text=MX+Master+3",
        created_at: new Date(),
      },
      {
        name: "Razer BlackWidow V3 Keyboard",
        price: 120,
        price_sale: 110,
        type: "Keyboard",
        category_id: insertedCategories.find(cat => cat.name === "Accessories")._id,
        image: "https://via.placeholder.com/150?text=Razer+BlackWidow",
        created_at: new Date(),
      },
      {
        name: "SteelSeries Arctis 7 Wireless Headset",
        price: 150,
        price_sale: 130,
        type: "Headset",
        category_id: insertedCategories.find(cat => cat.name === "Accessories")._id,
        image: "https://via.placeholder.com/150?text=SteelSeries+Arctis+7",
        created_at: new Date(),
      },
      {
        name: "Corsair Vengeance LPX 16GB RAM",
        price: 80,
        price_sale: 70,
        type: "RAM",
        category_id: insertedCategories.find(cat => cat.name === "PC Components")._id,
        image: "https://via.placeholder.com/150?text=Corsair+Vengeance+RAM",
        created_at: new Date(),
      },
      {
        name: "Samsung 970 EVO Plus 1TB SSD",
        price: 120,
        price_sale: 110,
        type: "Storage",
        category_id: insertedCategories.find(cat => cat.name === "PC Components")._id,
        image: "https://via.placeholder.com/150?text=Samsung+970+EVO",
        created_at: new Date(),
      }
    ];

    // Insert products vào MongoDB
    const insertedProducts = await Product.insertMany(products);
    console.log("Products inserted:", insertedProducts);

    const sales = [
      {
        product_id: insertedProducts.find(prod => prod.name === "MacBook Pro 16-inch")._id,
        discount_percentage: 8,
        start_date: new Date("2025-04-01T00:00:00Z"),
        end_date: new Date("2025-04-10T23:59:59Z"),
        created_at: new Date(),
      },
      {
        product_id: insertedProducts.find(prod => prod.name === "Dell XPS 13")._id,
        discount_percentage: 5,
        start_date: new Date("2025-04-02T00:00:00Z"),
        end_date: new Date("2025-04-05T23:59:59Z"),
        created_at: new Date(),
      },
      {
        product_id: insertedProducts.find(prod => prod.name === "Logitech MX Master 3 Mouse")._id,
        discount_percentage: 15,
        start_date: new Date("2025-04-01T00:00:00Z"),
        end_date: new Date("2025-04-15T23:59:59Z"),
        created_at: new Date(),
      },
      {
        product_id: insertedProducts.find(prod => prod.name === "SteelSeries Arctis 7 Wireless Headset")._id,
        discount_percentage: 10,
        start_date: new Date("2025-04-02T00:00:00Z"),
        end_date: new Date("2025-04-10T23:59:59Z"),
        created_at: new Date(),
      }
    ];

    // Insert sales vào MongoDB
    const insertedSales = await Sale.insertMany(sales);
    console.log("Sales inserted:", insertedSales);

  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.disconnect();
  }
};
