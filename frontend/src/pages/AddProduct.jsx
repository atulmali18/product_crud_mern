import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || form.price === "") return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/products", form);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-4">
      <h2 className="font-semibold text-lg">Add Product</h2>

      <input
        name="name"
        className="w-full border px-3 py-2 rounded"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />

      <input
        name="price"
        type="number"
        className="w-full border px-3 py-2 rounded"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        disabled={loading}
      />

      <button
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddProduct;
