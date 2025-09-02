import { useState, useContext } from "react";
import axios from "axios";
import {AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const CustomerRegister = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "", contact: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const success = await registerUser(form);
   if (success) {
  alert("Customer registered!");
  navigate("/login");
}

    
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customer Register</h2>
      {Object.keys(form).map((field) => (
        <input key={field} type="text" name={field} placeholder={field} value={form[field]} onChange={handleChange} />
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default CustomerRegister;
