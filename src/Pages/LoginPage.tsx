import { generateTempSession } from '@/apis';
import { useUserCookie } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
import { AuthUser } from '@/types';
import { css } from '@emotion/react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setCookie } = useUserCookie();

  const handleGoogleLogin = async () => {
    try {
      // TODO: 테스트 완료 후 구글 로그인으로 변경 예정
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
