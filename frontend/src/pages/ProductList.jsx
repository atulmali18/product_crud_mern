import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data.data);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border border-gray-300 rounded-md text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-center font-semibold w-12">
              No
            </th>
            <th className="border px-3 py-2 text-left font-semibold">
              Product
            </th>
            <th className="border px-3 py-2 text-left font-semibold">Price</th>
            <th className="border px-3 py-2 text-center font-semibold w-32">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="border py-6 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((p, index) => (
              <tr key={p._id} className="hover:bg-gray-50 transition">
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2">{p.name}</td>
                <td className="border px-3 py-2">₹ {p.price}</td>
                <td className="border px-3 py-2 text-center space-x-3">
                  <Link
                    to={`/edit/${p._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:underline cursor-pointer"
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
