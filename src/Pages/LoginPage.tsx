import { generateTempSession, getOAuthUrl } from '@/apis';
import { useUserCookie } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
import { AuthUser } from '@/types';
import { css, Theme } from '@emotion/react';
import { AxiosResponse } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, setCookie } = useUserCookie();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      const response = await getOAuthUrl('GOOGLE');
      window.location.href = `${response.data.redirectUrl}`;
    } catch (error) {
      console.error('Failed to fetch Google OAuth URL', error);
    }
  };

  const handleTempLogin = async () => {
    try {
      const response: AxiosResponse<{ data: AuthUser }> = await generateTempSession();
      const { status, data } = response;
      if (status === 200) {
        const { id, name } = data.data;

        setCookie(
          'user',
          { id, name },
          {
            path: '/',
            sameSite: 'strict',
          },
        );

        navigate('/squads', { replace: true });
        return;
      } else {
        // TODO: 세션 발급 실패 에러 처리
        console.error('Failed to generate session:', status);
      }
    } catch (error) {
      // TODO: 로그인 실패 에러 안내
      console.error('Failed to fetch Google OAuth URL', error);
    }
  };

  return (
    <div>
      <div css={loginContainer}>
        <img css={loginHomeImgStyle} src="/images/login.png" alt="login_image" />
        <button onClick={handleGoogleLogin} aria-label="Login with Google">
          <img css={googleLoginImgStyle} src="/images/google_login.png" alt="google_login" />
        </button>
        <button css={demoUserStyle} onClick={handleTempLogin}>
          테스트 계정 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

const loginContainer = css`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  overflow: auto;
`;

const loginHomeImgStyle = css`
  width: 70%;

  ${pcMediaQuery(css`
    width: 80%;
  `)}
`;

const googleLoginImgStyle = css`
  height: 48px;
  flex: 1;

  ${pcMediaQuery(css`
    height: 64px;
  `)}
`;

const demoUserStyle = (theme: Theme) => css`
  color: ${theme.colors.text};
  font-size: ${theme.typography.size_16};
  text-decoration: underline;
`;
