export type OAuthType = 'GOOGLE';

export type OAuthUrl = {
  statusCodeValue: number;
  message: string;
  data: {
    redirectUrl: string;
  };
};

export type OAuthRequestParams = {
  oauthType: OAuthType;
  code: string;
  scope: string;
};

export type UserProfile = {
  oauthType: OAuthType;
  email: 'string';
};

export type AuthUser = {
  id: number;
  name: string;
};
