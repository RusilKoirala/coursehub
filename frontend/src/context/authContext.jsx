import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on app load to keep logged-in state
  const fetchUser = async () => {
    try {
      const { data } = await axiosClient.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // login function
  const login = async (email, password) => {
    const { data } = await axiosClient.post("/auth/login", { email, password });
    await fetchUser();
    return data;
  };

  // logout function
  const logout = async () => {
    await axiosClient.post("/auth/logout");
    setUser(null);
  };

  // register function
  const register = async (name, email, password) => {
    const { data } = await axiosClient.post("/auth/register", { name, email, password });
    await fetchUser();
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
