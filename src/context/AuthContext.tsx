
import React, { createContext, useContext, useEffect, useState } from "react";
import { GoogleSheetsUser } from "@/services/googleSheets";

interface AuthContextType {
  user: GoogleSheetsUser | null;
  login: (user: GoogleSheetsUser, remember: boolean) => void;
  logout: () => void;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  initializing: true,
});

export const useAuth = () => useContext(AuthContext);

const LS_KEY = "sheet-savvy-user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<GoogleSheetsUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount for "remember me"
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setInitializing(false);
  }, []);

  const login = (user: GoogleSheetsUser, remember: boolean) => {
    setUser(user);
    if (remember) {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};
