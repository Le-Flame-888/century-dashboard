import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'assistant';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    console.log('AuthContext: Checking for existing user session');
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    console.log('AuthContext: Found token:', !!token, 'Found user:', !!savedUser);
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('AuthContext: Setting user:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    console.log('AuthContext: Setting isLoading to false');
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext: Login attempt for:', email);
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email === 'admin@century.com' && password === 'admin123') {
        console.log('AuthContext: Admin login successful');
        const userData: User = {
          id: '1',
          email: 'admin@century.com',
          name: 'Jean Dupont',
          role: 'admin',
          avatar: 'https://ui.shadcn.com/avatars/01.png'
        };
        
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoading(false);
        return true;
      } else if (email === 'teacher@century.com' && password === 'teacher123') {
        console.log('AuthContext: Teacher login successful');
        const userData: User = {
          id: '2',
          email: 'teacher@century.com',
          name: 'Marie Martin',
          role: 'teacher',
          avatar: 'https://ui.shadcn.com/avatars/02.png'
        };
        
        const token = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoading(false);
        return true;
      } else {
        console.log('AuthContext: Login failed - invalid credentials');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual registration API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration logic
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'assistant',
        avatar: 'https://ui.shadcn.com/avatars/03.png'
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 