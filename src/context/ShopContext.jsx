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


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  fetchProducts();
}, []);


  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select size");
      console.log(products);
      
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    toast.success("Product Added to Cart")
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
  let cartData = structuredClone(cartItems);

  // If product not in cart yet, create entry
  if (!cartData[itemId]) {
    cartData[itemId] = {};
  }

  // If size doesn’t exist, create it
  if (!cartData[itemId][size]) {
    cartData[itemId][size] = 0;
  }

  cartData[itemId][size] = quantity;
  setCartItems(cartData);
};


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id == items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.newprice * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const placeOrder = () => {
  const orderDetails = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        const product = products.find((p) => p.id === parseInt(itemId));
        if (product) {
          orderDetails.push({
            ...product,
            size,
            quantity: cartItems[itemId][size],
            date: new Date().toLocaleDateString(),
          });
        }
      }
    }
  }
  setOrders((prevOrders) => [...prevOrders, ...orderDetails]);
  setCartItems({});
  navigate("/orders");
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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    orders, 
    placeOrder, 
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;