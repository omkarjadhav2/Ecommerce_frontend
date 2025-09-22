import React from "react";
import CustomerRegister from "./pages/CustomerRegister";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SelectAddress from "./pages/SelectAddress";
import Orders from "./pages/Orders";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { Link } from "react-router-dom";
import ImageUpload from "./pages/upload";
import { ProductProvider } from "./context/ProductContext";
import Profile from "./pages/profile";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="px-4 sm:px-[5vw] md:px-[7vw] 1g:px-[9vw]">
          <ToastContainer
            position="bottom-right" 
            autoClose={2000} 
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />

          <Navbar />
          <nav>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <SearchBar></SearchBar>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/register/customer" element={<CustomerRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/address" element={<SelectAddress />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Footer></Footer>
        </div>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
