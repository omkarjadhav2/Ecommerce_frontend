// src/pages/Payment.jsx
import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import CartTotal from "../components/CartTotal";


const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const existing = document.getElementById("razorpay-js");
    if (existing) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Payment = () => {
  const [method, setMethod] = useState("cod");
  const { cartData  } = useContext(ShopContext); // not required for payment but available
  const { authTokens, selectedAddress } = useContext(AuthContext);
  const baseURL = "http://127.0.0.1:8000";

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address first.");
      return;
    }

    if (method === "cod") {
      // Call your backend order endpoint for cash-on-delivery (if you have one)
      // or reuse placeOrder in ShopContext. For now you already have placeOrder in context.
      alert("Cash on delivery is currently unavailable at your address");
      return;
    }

    if (method === "razorpay") {
      // 1) ask backend to create a Razorpay order
      try {
        const createResp = await axios.post(
          `${baseURL}/api/create-razorpay-order/`,
          { address_id: selectedAddress.id },
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { razorpay_order_id, amount, key } = createResp.data;

        // 2) load razorpay JS
        const ok = await loadRazorpayScript();
        if (!ok) {
          alert("Failed to load Razorpay SDK. Check network.");
          return;
        }

        // 3) configure options
        const options = {
          key, // razorpay key id
          amount: amount, // in paise
          currency: "INR",
          name: "Your Shop Name",
          description: "Purchase from shop",
          order_id: razorpay_order_id,
          handler: async function (response) {
            // response has razorpay_payment_id, razorpay_order_id, razorpay_signature
            try {
              const verifyResp = await axios.post(
                `${baseURL}/api/verify-razorpay/`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  address_id: selectedAddress.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              // success
              alert("Payment successful! Order placed.");
              // navigate to orders page or reload cart 

              window.location.href = "/orders";
            } catch (err) {
              console.error(err.response?.data || err);
              alert("Payment verification failed on server.");
            }
          },
          prefill: {
            name: (authTokens && authTokens.user && authTokens.user.username) || "",
            email: (authTokens && authTokens.user && authTokens.user.email) || "",
          },
          theme: { color: "#000000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err.response?.data || err);
        alert("Failed to start payment. Try again.");
      }
    }
  };

  return (
  <div className="mt-8">
    <div className="bg-white shadow-lg rounded-2xl p-6 min-w-80">
      {/* Section Title */}
      <Title text1="PAYMENT" text2="METHOD" />

      {/* Payment Options */}
      <div className="flex gap-4 flex-col lg:flex-row mt-6">
        {/* Razorpay Option */}
        <div
          onClick={() => setMethod("razorpay")}
          className={`flex items-center justify-between border rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 ${
            method === "razorpay"
              ? "border-blue-600 shadow-md bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                method === "razorpay" ? "border-blue-600" : "border-gray-400"
              }`}
            >
              {method === "razorpay" && (
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
              )}
            </span>
            <img className="h-6" src={assets.razorpay_logo} alt="razorpay" />
          </div>
          <span className="text-xs font-medium text-gray-500">Online Payment</span>
        </div>

        {/* Cash on Delivery Option */}
        <div
          onClick={() => setMethod("cod")}
          className={`flex items-center justify-between border rounded-xl px-5 py-4 cursor-pointer transition-all duration-200 ${
            method === "cod"
              ? "border-green-600 shadow-md bg-green-50"
              : "border-gray-300 hover:border-green-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                method === "cod" ? "border-green-600" : "border-gray-400"
              }`}
            >
              {method === "cod" && (
                <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
              )}
            </span>
            <p className="text-gray-700 text-sm font-semibold">Cash on Delivery</p>
          </div>
        </div>
      </div>

      {/* Cart Total */}
      <div className="mt-10">
        <CartTotal />
      </div>

      {/* Place Order Button */}
      <div className="w-full text-end mt-10">
        <button
          onClick={handlePlaceOrder}
          className="bg-black text-white px-16 py-3 rounded-lg text-sm font-semibold tracking-wide hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  </div>
);

};

export default Payment;
