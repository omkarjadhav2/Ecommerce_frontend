import axios from "axios";
import { createContext, useState, useEffect, Children } from "react";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000";

  const uploadProduct = async (productData) => {
  try {
    const res = await axios.post(`${baseURL}/api/upload/`, productData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.detail || "Error uploading product");
    return false;
  }
};


  return (
    <ProductContext.Provider value={{ uploadProduct}}>
      {children}
    </ProductContext.Provider>
  );
};