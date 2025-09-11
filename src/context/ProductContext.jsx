import axios from "axios";
import { createContext } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000";

  const uploadProduct = async (productData) => {
    try {
      const token = localStorage.getItem("authTokens") 
        ? JSON.parse(localStorage.getItem("authTokens")).access 
        : null;

      const res = await axios.post(`${baseURL}/api/upload/`, productData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return res.status === 201;
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.detail || "Error uploading product ");
      return false;
    }
  };
 
  return (
    <ProductContext.Provider value={{ uploadProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
