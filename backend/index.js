const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/product.route");

const app = express();

dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
