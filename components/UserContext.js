// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usersList, setUsersList] = useState([]);

  const addUser = (user) => {
    setUsersList(prev => [...prev, { key: (prev.length + 1).toString(), ...user }]);
  };

  return (
    <UserContext.Provider value={{ usersList, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
