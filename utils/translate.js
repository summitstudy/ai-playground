import en from '@/translations/en.json';
import ko from '@/translations/ko.json';

const translations = {
  en,
  ko
};

export const translate = (key, language) => {
    const value = translations[language][key];
    return value === undefined ? '' : value;
};