import React, { createContext, useContext, useState } from 'react';

type Language = 'english' | 'hindi' | 'tamil';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations = {
  english: {
    'nav.dashboard': 'Dashboard',
    'nav.assessment': 'Assessment',
    'nav.chat': 'Chat',
    'nav.resources': 'Resources',
    'nav.analytics': 'Analytics',
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'auth.login': 'Login',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'dashboard.welcome': 'Welcome',
    'phq9.title': 'PHQ-9 Depression Assessment',
    'phq9.instruction': 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    'auth.error.invalidCredentials': 'Invalid email or password',
    'auth.error.generic': 'An error occurred. Please try again.'
  },
  hindi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.assessment': 'मूल्यांकन',
    'nav.chat': 'चैट',
    'nav.resources': 'संसाधन',
    'nav.analytics': 'एनालिटिक्स',
    'common.loading': 'लोड हो रहा है...',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'auth.login': 'लॉगिन',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'dashboard.welcome': 'स्वागत है',
    'phq9.title': 'PHQ-9 डिप्रेशन मूल्यांकन',
    'phq9.instruction': 'पिछले 2 सप्ताह में, निम्नलिखित समस्याओं से आप कितनी बार परेशान हुए हैं?',
    'auth.error.invalidCredentials': 'अमान्य ईमेल या पासवर्ड',
    'auth.error.generic': 'एक त्रुटि हुई। कृपया पुन: प्रयास करें।'
  },
  tamil: {
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.assessment': 'மதிப்பீடு',
    'nav.chat': 'அரட்டை',
    'nav.resources': 'வளங்கள்',
    'nav.analytics': 'பகுப்பாய்வு',
    'common.loading': 'ஏற்றுகிறது...',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமிக்கவும்',
    'auth.login': 'உள்நுழைய',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'dashboard.welcome': 'வணக்கம்',
    'phq9.title': 'PHQ-9 மனச்சோர்வு மதிப்பீடு',
    'phq9.instruction': 'கடந்த 2 வாரங்களில், பின்வரும் பிரச்சினைகளால் நீங்கள் எவ்வளவு அடிக்கடி பாதிக்கப்பட்டீர்கள்?',
    'auth.error.invalidCredentials': 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்',
    'auth.error.generic': 'ஒரு பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('english');

  const t = (key: string, fallback?: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};