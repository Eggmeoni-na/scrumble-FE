import { instance } from '@/apis';
import { OAuthRequestParams, OAuthUrl, UserProfile } from '@/types';
import { AxiosResponse } from 'axios';

// 개발기용 임시 로그인 API
export const generateEmptySession = async () => {
  const response = await instance.post('/api/test/session/no-content-session');
  return response;
};

export const generateTempSession = async () => {
  const response = await instance.post('/api/test/session/session', {
    email: 'testA@email.com',
    // email: 'scrumble@email.com',
  });
  return response;
};

// 배포 완료 API
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
