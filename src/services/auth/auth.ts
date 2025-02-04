import { GoogleUserInfo, TokenResponse, User } from "../../types/auth";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const signInWithGoogle = async (): Promise<{ user: User; token: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const auth2 = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile',
        callback: async (response: TokenResponse) => {
          if (response.error) {
            reject(new Error(response.error));
            return;
          }
          try {
            const result = await handleAuthResponse(response);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
      });

      auth2.requestAccessToken();
    } catch (error) {
      console.error('Google Sign In Error:', error);
      reject(error);
    }
  });
};

const handleAuthResponse = async (response: TokenResponse): Promise<{ user: User; token: string }> => {
  try {
    const token = response.access_token;
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res.json() as Promise<GoogleUserInfo>);

    const user: User = {
      id: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      accessToken: token,
    };

    return { user, token };
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        window.google.accounts.oauth2.revoke(token, () => {
          localStorage.removeItem('auth_token');
          resolve();
        });
      } else {
        resolve();
      }
    } catch (error) {
      console.error('Sign Out Error:', error);
      reject(error);
    }
  });
};

export const validateToken = async (token: string): Promise<User> => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    const userInfo = await response.json() as GoogleUserInfo;
    return {
      id: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      accessToken: token,
    };
  } catch (error) {
    console.error('Token Validation Error:', error);
    throw error;
  }
};