import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border">Product</th>
            <th className="text-left px-4 py-2 border">Price</th>
            <th className="text-center px-4 py-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{p.name}</td>
                <td className="px-4 py-2 border">₹ {p.price}</td>
                <td className="px-4 py-2 border text-center space-x-2">
                  <Link
                    to={`/edit/${p._id}`}
                    className="inline-block bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
