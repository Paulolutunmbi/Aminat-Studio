import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  authLoading: boolean;
  mustChangePassword: boolean;
  username: string | null;
  login: (user: string, pass: string) => Promise<{ success: boolean; mustChangePassword: boolean }>;
  logout: () => Promise<void>;
  refreshAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const refreshAuthState = async () => {
    try {
      const result = await api.getAdminStatus();
      setIsAuthenticated(Boolean(result?.authenticated));
      setMustChangePassword(Boolean(result?.mustChangePassword));
      setUsername(result?.authenticated ? 'admin' : null);
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
      setMustChangePassword(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    refreshAuthState();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; mustChangePassword: boolean }> => {
    try {
      const response = await api.loginAdmin(email, pass);
      if (!response?.success) {
        setIsAuthenticated(false);
        setUsername(null);
        setMustChangePassword(false);
        return { success: false, mustChangePassword: false };
      }

      await refreshAuthState();
      return { success: true, mustChangePassword: Boolean(response.mustChangePassword) };
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
      setMustChangePassword(false);
      return { success: false, mustChangePassword: false };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.logoutAdmin();
    } catch {
      // ignore backend logout failure and clear local state
    }

    setIsAuthenticated(false);
    setUsername(null);
    setMustChangePassword(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authLoading, mustChangePassword, username, login, logout, refreshAuthState }}>
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
