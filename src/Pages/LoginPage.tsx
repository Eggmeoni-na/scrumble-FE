import { generateTempSession, getOAuthUrl } from '@/apis';
import { EmailInputModal } from '@/components/common/Modal';
import CopyText from '@/components/CopyText';
import { useModal, useUserCookie } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
import { AuthUser } from '@/types';
import { css, Theme } from '@emotion/react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, setCookie } = useUserCookie();
  const navigate = useNavigate();
  const { ModalContainer: EmailInputModalContainer, openModal } = useModal();

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

  const getUserInput = async () => {
    const res = await openModal(EmailInputModal);
    if (!res.ok || !res.value) return null;
    return res.value;
  };

  const setUserCookie = (user: AuthUser) =>
    setCookie('user', { id: user.id, name: user.name }, { path: '/', sameSite: 'strict' });

  const handleTempLogin = async () => {
    try {
      const user = await getUserInput();
      if (!user) return;

      const { data: session } = await generateTempSession(user);
      if (!session) return;
      setUserCookie(session);

      navigate('/squads', { replace: true });
    } catch (error) {
      console.error('임시 로그인 실패', error);
    }
  };

  return (
    <>
      <div css={loginContainer}>
        <img css={loginHomeImgStyle} src="/images/login.png" alt="login_image" />
        <button onClick={handleGoogleLogin} aria-label="구글 계정으로 로그인">
          <img css={googleLoginImgStyle} src="/images/google_login.png" alt="google_login" />
        </button>
        <button css={demoUserStyle} onClick={handleTempLogin}>
          테스트 계정 로그인
        </button>
        <CopyText />
      </div>
      <EmailInputModalContainer />
    </>
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
  ${theme.typography.size_16}
  text-decoration: underline;
`;
