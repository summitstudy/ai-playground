"use client"
import { useState, createContext } from 'react';

const Context = createContext();

export const SetProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');
  const [userName, setuserName] = useState(''); //나중에 유저 닉네임 여기에 담기
  return (
    <Context.Provider value={{ language, setLanguage }}>
      {children}
    </Context.Provider>
  );
};

export default Context;