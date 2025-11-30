import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const product = res.data.data.find((p) => p._id === id);

        if (!product) {
          alert("Product not found");
          navigate("/");
          return;
        }

        setForm({
          name: product.name,
          price: product.price,
        });
      } catch {
        alert("Failed to load product");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || form.price === "") return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.name) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <h2 className="font-semibold text-lg">Edit Product</h2>

      <input
        name="name"
        className="w-full border px-3 py-2 rounded"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />

      <input
        name="price"
        type="number"
        className="w-full border px-3 py-2 rounded"
        value={form.price}
        onChange={handleChange}
        disabled={loading}
      />

      <button
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditProduct;
