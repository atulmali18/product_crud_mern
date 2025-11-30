const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

// GET
router.get("/", getProducts);

// POST /
router.post("/", createProduct);

// PUT
router.put("/:id", updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;
