import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000";
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
  const [user, setUser] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const res = await axios.post( `${baseURL}/api/auth/login/`, { username, password });
      setAuthTokens(res.data);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      return true;
    } catch (err) {
      console.error("Login failed", err.response.data);
      alert(err.response.data.detail)
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const registerUser = async (form) => {
  try {
    const response = await axios.post(`${baseURL}/api/auth/register/customer/`, form);
    if (response.status === 201) {
      return true;  
    }
    return false; 
  } catch (err) {
    console.error(err.response?.data.username);
    alert(err.response?.data.username)
    return false; 
  }
};

const userDetails = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/api/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser , registerUser , userDetails}}>
      {children}
    </AuthContext.Provider>
  );
};
