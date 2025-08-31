import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
  const [user, setUser] = useState(null);

  const loginUser = async (username, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", { username, password });
      setAuthTokens(res.data);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      return true;
    } catch (err) {
      console.error("Login failed", err.response.data);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
