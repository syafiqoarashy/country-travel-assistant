export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
    accessToken: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: Error | null;
  }
  
  export interface AuthContextType extends AuthState {
    login: () => Promise<void>;
    logout: () => Promise<void>;
  }

  declare global {
    export interface Window {
      google: {
        accounts: {
          oauth2: {
            initTokenClient(config: TokenClientConfig): TokenClient;
            revoke(token: string, callback?: () => void): void;
          };
        };
      };
    }
  }
  
  export interface TokenClientConfig {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
  }
  
  export interface TokenClient {
    requestAccessToken(): void;
  }
  
  export interface TokenResponse {
    access_token: string;
    error?: string;
  }
  
  export interface GoogleUserInfo {
    sub: string;
    name: string;
    email: string;
    picture?: string;
  }