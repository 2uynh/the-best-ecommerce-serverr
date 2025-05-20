const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const saleRoutes = require("./routes/saleRoutes");
const customerRoutes = require("./routes/customerRoutes");
const changePasswRoutes = require("./routes/changePassRoutes");


require("dotenv").config();
const checkoutRoutes = require("./routes/checkout");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors()); 

app.use(bodyParser.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/change-password", changePasswRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
