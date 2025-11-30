import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  // let locCart = localStorage.getItem("loccart") || [];
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState(0);

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

  const handleCart = (p) => {
    setCart((prevCart) => {
      let count;
      for (let i = 0; i <= cart.length - 1; i++) {
        count = count + cart[i].price;
      }
      setTotal(count);
      return [...prevCart, p];
    });
    // localStorage.setItem("loccart", cart);
  };
  return (
    <div className="mt-4 overflow-x-auto">
      <span className="text-blue-600 font-semibold">
        Cart :{cart.length ? cart.length : 0}{" "}
        <span className="pl-5">Total Price : {total}</span>
      </span>
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
                <td className="border px-3 py-2">
                  <button
                    onClick={() => {
                      handleCart(p);
                    }}
                  >
                    Add to Cart
                  </button>
                </td>

                <td className="border px-3 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/edit/${p._id}`}
                      className="px-2 py-1 text-sm rounded-md border border-blue-600 text-blue-600 
                 hover:bg-blue-600 hover:text-white transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="px-3 py-1 text-sm rounded-md border border-red-600 text-red-600 
                 hover:bg-red-600 hover:text-white transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
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
