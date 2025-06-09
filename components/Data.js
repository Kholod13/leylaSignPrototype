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

];

export function userNameList() {
  for (let key in usersList) {
    console.log(`${key}: ${usersList[key].label}`);
  }
}