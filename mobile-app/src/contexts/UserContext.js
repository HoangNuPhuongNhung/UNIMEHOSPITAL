import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const UserContext = createContext();

// Tạo Provider
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext };
