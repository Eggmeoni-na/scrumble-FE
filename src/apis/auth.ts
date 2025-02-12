import { instance } from '@/apis';
import { AuthUser, OAuthRequestParams, OAuthUrl, UserProfile } from '@/types';
import { AxiosResponse } from 'axios';

const generateTempSession = async (email: string) => {
  const response = await instance.post('/api/test/session/join', {
    email,
  });
  return response;
};

export const getTempUserSession = async (email: string): Promise<AuthUser | null> => {
  try {
    const res: AxiosResponse<{ data: AuthUser }> = await generateTempSession(email);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.error('세션 발급 실패:', error);
  }

  return null;
};

export const getOAuthUrl = async (oauthType: string) => {
  const response: AxiosResponse<OAuthUrl> = await instance.get('/api/auth/oauth-url', {
    params: {
      oauthType,
    },
  });
  return response.data;
};

export const signInOrSignUp = async ({ oauthType, code, scope }: OAuthRequestParams) => {
  const data = {
    oauthType,
    code,
    scope,
  };

  const response = await instance.post('/api/auth/login', data);
  return response;
};

export const logoutUser = async () => {
  const response = await instance.post('/api/auth/logout');
  return response;
};

export const getUser = async (): Promise<{ data: UserProfile }> => {
  const response = await instance.get('/api/users/me');
  return response.data;
};

export const deleteUser = async () => {
  const response = await instance.delete('/api/users');
  return response.data;
};

export const editNickname = async (newName: string) => {
  const response = await instance.put('/api/users', { newName });
  return response.data;
};
