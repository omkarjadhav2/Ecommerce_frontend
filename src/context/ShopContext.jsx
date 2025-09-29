import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const baseURL = import.meta.env.VITE_API_BASE;

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products/`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  fetchProducts();
}, [baseURL]);


  const addToCart = async (itemId, size, authTokens) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }
    if(!authTokens){
      toast.error("please login")
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/cart/`,
        {
          product_id: itemId, 
          size: size,
          quantity: 1, 
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Product Added to Cart");
      setCartItems(response.data);
      getCartItems(authTokens);

      return response.status === 201;
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "Failed to add to cart");
      return false;
    }
  };

  const getCartItems = async (authTokens) => {
    try {
      const response = await axios.get(`${baseURL}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      });

      
      const items = response.data.items || [];

      setCartCount(items.length);
      setCartData(items);

      return items;
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  const updateQuantity = async (itemId, size, quantity, authTokens) => {
    try {
      const response = await axios.patch(
        `${baseURL}/api/cart/`,
        {
          product_id: itemId,
          size: size,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Cart updated");
      await getCartItems(authTokens);
      return response.data;
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.detail || "Failed to update cartt");
      return false;
    }
  };

  const getCartAmount = () => {
    console.log("myarray", cartData);

    if (!Array.isArray(cartData)) return 0;

    let totalAmount = 0;
    cartData.forEach((item) => {
      if (item?.product?.newprice && item?.quantity) {
        totalAmount += parseFloat(item.product.newprice) * item.quantity;
      }
    });
    return totalAmount;
  };

  const placeOrder = async (authTokens, addressId, paymentMethod) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/orders/`,
        {
          address_id: addressId,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Order placed successfully");
      navigate("/orders");
      return response.data;
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.detail || "Failed to place order");
      return false;
    }
  };

  const removeFromCart = async (itemId, size, authTokens) => {
    try {
      const response = await axios.delete(`${baseURL}/api/cart/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
        data: {
          product_id: itemId,
          size: size,
        },
      });

      toast.success("Item removed");
      await getCartItems(authTokens);

      return response.status === 200;
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.detail || "Failed to remove from cart");
      return false;
    }
  };

  const getOrderItems = async (authTokens) => {
  try {
    const response = await axios.get(`${baseURL}/api/orders/`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        "Content-Type": "application/json",
      },
    });

    
    const orders = response.data;

  
    const items = orders.flatMap(order => order.items);

    setOrders(orders);

    

    return items;
  } catch (error) {
    console.error(error.response?.data);
  }
};

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    navigate,
    orders,
    placeOrder,
    getCartItems,
    cartCount,
    removeFromCart,
    cartData,
    getOrderItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
