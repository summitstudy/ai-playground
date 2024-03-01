import { useState, createContext, useEffect } from 'react';

const Context = createContext();

export const SetProvider = ({ children }) => {
  const [language, setLanguage] = useState('ko');
  const [userName, setUserName] = useState('');
  const isBrowser = () => typeof window !== "undefined";

  useEffect(() => {
    if (isBrowser()) {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      const savedUserName = localStorage.getItem('userName');
      if (savedUserName) {
        setUserName(savedUserName);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      localStorage.setItem('language', language);
      localStorage.setItem('userName', userName);
    }
  }, [language, userName]);

  return (
    <Context.Provider value={{ language, setLanguage, userName, setUserName }}>
      {children}
    </Context.Provider>
  );
};

export default Context;

