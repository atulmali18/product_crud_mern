const Product = require("../models/product.model");

// GET
exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

// POST
exports.createProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  const product = new Product({ name, price });
  await product.save();

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

// PUT
exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updated,
  });
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};
