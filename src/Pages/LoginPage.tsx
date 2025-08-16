import { generateTempSession, getOAuthUrl } from '@/apis';
import { ActionModal, EmailInputModal } from '@/components/common/Modal';
import CopyText from '@/components/CopyText';
import { EXTERNAL_URLS, LOGIN_ERROR_MESSAGES, OAUTH_TYPE } from '@/constants';
import { useModal, useUserCookie } from '@/hooks';
import { pcMediaQuery } from '@/styles/breakpoints';
import { ActionModalType, AuthUser } from '@/types';
import { css, Theme } from '@emotion/react';
import { Navigate, useNavigate } from 'react-router-dom';

const isDev =
  window.location.hostname === import.meta.env.VITE_DEV_DOMAIN ||
  import.meta.env.MODE === 'development' ||
  window.location.hostname === 'localhost';

const ERROR_REDIRECT_MODAL: ActionModalType = {
  type: 'confirm',
  text: '운영 서비스로 이동',
  message: isDev ? LOGIN_ERROR_MESSAGES.SERVER_DOWN : LOGIN_ERROR_MESSAGES.TRY_AGAIN_LATER,
  displayCancel: false,
};

const LoginPage = () => {
  const { user, setCookie } = useUserCookie();
  const navigate = useNavigate();
  const { ModalContainer: EmailInputModalContainer, openModal: openEmailInputModal } = useModal();
  const { ModalContainer: LoginErrorModalContainer, openModal: openErrorModal } = useModal();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const redirectTo = (url: string) => {
    window.location.href = url;
  };

  const handleServerErrorRedirect = async () => {
    const result = await openErrorModal(ActionModal, null, ERROR_REDIRECT_MODAL);

    if (result.ok && isDev) {
      redirectTo(EXTERNAL_URLS.PROD_SERVICE);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await getOAuthUrl(OAUTH_TYPE.GOOGLE);
      redirectTo(response.data.redirectUrl);
    } catch (error) {
      console.error('Failed to fetch Google OAuth URL', error);
      await handleServerErrorRedirect();
    }
  };

  const getUserEmailFromModal = async () => {
    const result = await openEmailInputModal(EmailInputModal);
    return result.ok ? result.value : null;
  };

  const setUserCookie = (user: AuthUser) =>
    setCookie('user', { id: user.id, name: user.name }, { path: '/', sameSite: 'strict' });

  const handleTempLogin = async () => {
    try {
      const email = await getUserEmailFromModal();
      if (!email) return;

      const { data: tempSession } = await generateTempSession(email);
      if (!tempSession) return;

      setUserCookie(tempSession);
      navigate('/squads', { replace: true });
    } catch (error) {
      console.error('임시 로그인 실패', error);
      await handleServerErrorRedirect();
    }
  };

  return (
    <>
      <div css={loginContainer}>
        <img css={loginHomeImgStyle} src="/images/login.png" alt="login_image" />
        <button onClick={handleGoogleLogin} aria-label="구글 계정으로 로그인">
          <img css={googleLoginImgStyle} src="/images/google_login.png" alt="google_login" />
        </button>
        {isDev && (
          <>
            <button css={demoUserStyle} onClick={handleTempLogin}>
              테스트 계정 로그인
            </button>
            <CopyText />
          </>
        )}
      </div>
      {isDev && <EmailInputModalContainer />}
      {isDev && <LoginErrorModalContainer />}
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
