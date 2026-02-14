import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return (savedLanguage === 'tr' || savedLanguage === 'en') ? savedLanguage : 'tr';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
    };

    const t = (key) => {
        const keys = key.split('.');
        // Fallback to 'tr' if current language is invalid or missing
        let value = translations[language] || translations['tr'];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${language}`);
                return key;
            }
        }

        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
