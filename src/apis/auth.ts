import { instance } from '@/apis';
import { AuthUser, OAuthRequestParams, OAuthUrl, UserProfile } from '@/types';
import { AxiosResponse } from 'axios';

export const generateTempSession = async (email: string): Promise<{ data: AuthUser }> => {
  const response = await instance.post('/api/test/session/session', {
    email,
  });
  return response.data;
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
