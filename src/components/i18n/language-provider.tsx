
import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "ar";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "ui-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.lang = language;
    
    // Add RTL class if Arabic
    if (language === "ar") {
      root.classList.add("rtl");
    } else {
      root.classList.remove("rtl");
    }
  }, [language]);

  const setLanguage = (language: Language) => {
    localStorage.setItem(storageKey, language);
    setLanguageState(language);
  };

  return (
    <LanguageProviderContext.Provider
      {...props}
      value={{ language, setLanguage }}
    >
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
