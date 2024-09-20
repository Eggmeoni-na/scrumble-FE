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

export type User = {
  oauthType: OAuthType;
  email: 'string';
};
