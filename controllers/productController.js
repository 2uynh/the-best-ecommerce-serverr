const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { name, price, type, category_id, image, is_featured, featured_type, description } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      type,
      category_id,
      image,
      is_featured,
      featured_type,
      description
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category_id = category;
    }

    let sortOption = {};

    if (sort === "asc") sortOption.price = 1;
    else if (sort === "desc") sortOption.price = -1;

    // Truy vấn sản phẩm và chỉ lấy giá (price)
    const products = await Product.find(query).sort(sortOption);

    // Chỉ trả về thông tin giá gốc
    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      price: product.price, // Chắc chắn rằng price được trả về
    }));

    res.status(200).json(updatedProducts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};




exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = {};

  if (req.body.name !== undefined) updateData.name = req.body.name;
  if (req.body.price !== undefined) updateData.price = req.body.price;
  if (req.body.description !== undefined) updateData.description = req.body.description;
  if (req.body.category_id !== undefined)
    updateData.category_id = req.body.category_id;
  if (req.body.image !== undefined) updateData.image = req.body.image;
  if (req.body.is_featured !== undefined)
    updateData.is_featured = req.body.is_featured;
  if (req.body.featured_type !== undefined)
    updateData.featured_type = req.body.featured_type;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ msg: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ msg: "Product not found" });
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getFeaturedProducts = async (req, res) => {
  const { type } = req.query;

  try {
    const filter = {
      is_featured: true,
    };

    if (type) {
      filter.featured_type = type;
    }

    console.log(type);

    const products = await Product.find(filter).populate("category_id");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
