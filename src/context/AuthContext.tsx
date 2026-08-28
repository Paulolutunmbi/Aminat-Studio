import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'aminat_studio_auth_v1';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored).isAuthenticated : true; // Default to authenticated for instant preview access, toggleable
    } catch {
      return true;
    }
  });

  const [username, setUsername] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored).username : 'aminat';
    } catch {
      return 'aminat';
    }
  });

  const login = async (user: string, pass: string): Promise<boolean> => {
    // Non-sensitive mock check for development/preview
    if (user.trim().length > 0 && pass.trim().length > 0) {
      setIsAuthenticated(true);
      setUsername(user.trim());
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ isAuthenticated: true, username: user.trim() })
      );
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
