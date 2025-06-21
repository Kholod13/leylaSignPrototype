// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
const [currentUserEmail, setCurrentUserEmail] = useState(null);

  const [usersList, setUsersList] = useState([
    { key: '1', 
    email: 'leyla@gmail.com', 
    interests: ['art', 'music'], 
    learnedLanguage: 'fr', 
    nativeLanguage: 'ru', 
    levelLanguage: 'A1', 
    password: '123456gG',
    folders: [ 
      { id: 'f1', name: 'Favorites' },
      { id: 'f2', name: 'Grammar' },
    ]
  },
  { 
    key: '2',
    email: 'admin@gmail.com', 
    interests: ['art', 'music'], 
    learnedLanguage: 'fr', 
    nativeLanguage: 'ru', 
    levelLanguage: 'A1', 
    password: '123456gG',
    folders: [ // ⬅️ нове поле
      { id: 'f1', name: 'Favorites' },
      { id: 'f2', name: 'Grammar' },
    ]
  },
  ]);
    
  const addUser = (user) => {
  setUsersList(prev => [
    ...prev,
    {
      key: (prev.length + 1).toString(),
      folders: [], // ⬅️ Додаємо папки
      ...user
    }
  ]);
};
const addFolderToUser = (email, newFolder) => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) => {
        if (user.email === email) {
          return {
            ...user,
            folders: [...(user.folders || []), newFolder],
          };
        }
        return user;
      })
    );
  };

  return (
    <UserContext.Provider value={{ usersList, setUsersList, addUser, addFolderToUser, currentUserEmail, setCurrentUserEmail }}>
      {children}
    </UserContext.Provider>

  );

};

export const useUsers = () => useContext(UserContext);
