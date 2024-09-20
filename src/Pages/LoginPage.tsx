import { generateTempSession, getUser } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { pcMediaQuery } from '@/styles/breakpoints';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleGoogleLogin = async () => {
    try {
      // TODO: 테스트 완료 후 구글 로그인으로 변경 예정
      const response = await generateTempSession();
      if (response.status === 200) {
        const { data: user } = await getUser();
        login(user);
        navigate('/squad');
        return;
      } else {
        // TODO: 세션 발급 실패 에러 처리
        console.error('Failed to generate session:', response.status);
      }
    } catch (error) {
      // TODO: 로그인 실패 에러 안내
      console.error('Failed to fetch Google OAuth URL', error);
    }
  };

  return (
    <div css={loginContainer}>
      <img css={loginHomeImgStyle} src="/images/login.png" alt="login_image" />
      <button onClick={handleGoogleLogin} aria-label="Login with Google">
        <img css={googleLoginImgStyle} src="/images/google_login.png" alt="google_login" />
      </button>
    </div>
  );
};

export default LoginPage;

const loginContainer = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const loginHomeImgStyle = css`
  width: 70%;
  margin-top: 112px;

  ${pcMediaQuery(css`
    width: 80%;
  `)}
`;

const googleLoginImgStyle = css`
  height: 48px;

  ${pcMediaQuery(css`
    height: 64px;
  `)}
`;
