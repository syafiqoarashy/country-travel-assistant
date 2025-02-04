import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState } from '../types/auth';
import { validateToken, signInWithGoogle, signOut } from '../services/auth/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const user = await validateToken(token);
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Authentication failed'),
        });
      }
    };

    checkAuth();
  }, []);

  const login = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      const result = await signInWithGoogle();
      
      if (result.user && result.token) {
        localStorage.setItem('auth_token', result.token);
        setAuthState({
          isAuthenticated: true,
          user: result.user,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Login failed'),
      }));
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await signOut();
      localStorage.removeItem('auth_token');
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Logout failed'),
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};