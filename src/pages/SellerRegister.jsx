import { useState } from "react";
import axios from "axios";

const SellerRegister = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", contact: "", store_name: "", gst_number: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/seller/", form);
      alert("Seller registered!");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Seller Register</h2>
      {Object.keys(form).map((field) => (
        <input key={field} type="text" name={field} placeholder={field} value={form[field]} onChange={handleChange} />
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default SellerRegister;
