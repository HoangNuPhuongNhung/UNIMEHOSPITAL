import React, { createContext, useState } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm đăng nhập
  const login = async (username, password) => {
    setLoading(true);
    // try {
      const userData = await authService.login(username, password);
      setUser(userData);
      return true; // Trả về true nếu đăng nhập thành công
    // } catch (error) {
    //   console.error("Lỗi đăng nhập:", error.message);
    //   throw error; // Ném lại lỗi để xử lý ở nơi gọi
    // } finally {
    //   setLoading(false);
    // }
  };

  const logout = async () => {
    setUser(null);
    await authService.logout();  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
