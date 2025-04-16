
import { User } from '@/types';
import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  // Check if user is logged in on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: parsedUser });
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // For frontend demo, we'll just simulate API calls
  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // In a real app, this would be an API call
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const user: User = {
      id: '1',
      name: 'Demo User',
      email: email,
      token: 'fake-jwt-token',
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // In a real app, this would be an API call
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const user: User = {
      id: '1',
      name: name,
      email: email,
      token: 'fake-jwt-token',
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'REGISTER_SUCCESS', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
