"use client"
import { useState, createContext, useEffect } from 'react';

const Context = createContext();

export const SetProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'ko';
  });
  const [userName, setUserName] = useState(() => {
    const savedUserName = localStorage.getItem('userName');
    return savedUserName || '';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <Context.Provider value={{ language, setLanguage, userName, setUserName }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
