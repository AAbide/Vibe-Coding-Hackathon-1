import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = 'business' | 'customer';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  userType: UserType | null;
  login: (email: string, password: string, type: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, type: UserType, phone?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string, type: UserType): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login - in a real app, this would be an API call
      // This is just for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: type === 'business' ? 'Sample Business' : 'John Doe',
        email,
        phone: type === 'customer' ? '555-123-4567' : undefined,
        type
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    type: UserType, 
    phone?: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock registration - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        type
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const value = {
    user,
    isLoggedIn: !!user,
    userType: user?.type || null,
    login,
    register,
    logout,
    loading,
    error
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};