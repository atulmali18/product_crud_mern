import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4">
        <nav className="flex justify-between">
          <Link className="text-blue-600 font-semibold" to="/">
            Products
          </Link>
          <Link className="text-green-600 font-semibold" to="/add">
            Add Product
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
