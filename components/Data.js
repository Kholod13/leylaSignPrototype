import React from 'react';

export const usernameList = [
  { key: '1', label: 'Vlad'},
  { key: '2', label: 'Rita'},
  { key: '3', label: 'Leyla'},
];

export const mailsList = [
  { key: '1', label: 'leyla@gmail.com'},
  { key: '2', label: 'admin@gmail.com'},
];

export const usersList = [ 
  { key: '1', email: 'leyla@gmail.com', interests: ['art', 'music'], learnedLanguage: 'fr', nativeLanguage: 'ru', levelLanguage: 'A1', password: '123456gG' },
  { key: '2', email: 'admin@gmail.com', interests: ['art', 'music'], learnedLanguage: 'fr', nativeLanguage: 'ru', levelLanguage: 'A1', password: '123456gG' },
];

export function userNameList() {
  usersList.forEach((user, index) => {
    console.log(`${index}: ${user.label}`);
  });
}
