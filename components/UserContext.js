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
    folders: [ // ⬅️ нове поле
      { id: 'f1', name: 'Favorites', words: [
        {word: 'Thank you', translation: 'Спасибо', hint: 'A polite expression of gratitude'},
      ]},
      { id: 'f2', name: 'Grammar', words: [
        { word: 'Hello', translation: 'Привет', hint: 'A common greeting in French' },
        { word: 'Bye', translation: 'Пака', hint: 'A common farewell' },
      ] },
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
      { id: 'f1', name: 'Favorites', words: [
        {word: 'Thank you', translation: 'Спасибо', hint: 'A polite expression of gratitude'},
      ]},
      { id: 'f2', name: 'Grammar', words: [
        { word: 'Hello', translation: 'Привет', hint: 'A common greeting in French' },
        { word: 'Bye', translation: 'Пака', hint: 'A common farewell' },
      ] },
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

const addWordToFolder = (email, folderId, word) => {
  setUsersList((prevUsers) =>
    prevUsers.map((user) => {
      if (user.email === email) {
        return {
          ...user,
          folders: user.folders.map((folder) => {
            if (folder.id === folderId) {
              return {
                ...folder,
                words: [...(folder.words || []), word],
              };
            }
            return folder;
          }),
        };
      }
      return user;
    })
  );
};

  return (
    <UserContext.Provider value={{
      usersList,
      setUsersList,
      addUser,
      addFolderToUser,
      currentUserEmail,
      setCurrentUserEmail,
      addWordToFolder,
      }}>
      {children}
    </UserContext.Provider>

  );

};

export const useUsers = () => useContext(UserContext);
