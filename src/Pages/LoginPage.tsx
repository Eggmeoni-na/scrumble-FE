import { pcMediaQuery } from '@/styles/breakpoints';
import { css } from '@emotion/react';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // TODO: Issue-11에서 Oauth 연동 예정
  };

  return (
    <div css={Container}>
      <img css={LoginHomeImg} src="/images/login.png" alt="login_image" />
      <button onClick={handleGoogleLogin} aria-label="Login with Google">
        <img css={GoogleLoginImg} src="/images/google_login.png" alt="google_login" />
      </button>
    </div>
  );
};

export default LoginPage;

const Container = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const LoginHomeImg = css`
  width: 70%;
  margin-top: 112px;

  ${pcMediaQuery(css`
    width: 80%;
  `)}
`;

const GoogleLoginImg = css`
  height: 48px;

  ${pcMediaQuery(css`
    height: 64px;
  `)}
`;
