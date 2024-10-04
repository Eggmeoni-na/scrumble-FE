import { Add, Back, Bell, Dark, Light } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { CreateSquad } from '@/components/common/Modal/ModalContents';
import { useModal } from '@/hooks/useModal';
import { useThemeStore } from '@/stores/theme';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);
  const navigate = useNavigate();
  const { ModalContainer, openModal } = useModal();

  const handleBack = () => navigate(-1);
  const handleCreateSquad = async () => {
    const res = await openModal(CreateSquad);
    if (!res.ok || !res.value) return;
    // TODO: Issue-34 스쿼드 생성 API 연동
  };

  return (
    <header css={headerContainer}>
      <div>
        <IconWrapper aria-label="Go to back" role="button" onClick={handleBack} disabled={location.pathname === '/'}>
          <Back />
        </IconWrapper>
        {location.pathname === '/' && <img css={logoStyle} src="./images/logo.png" alt="logo" />}
      </div>
      <div css={rightMenu}>
        <IconWrapper aria-label="Toggle theme" onClick={toggleTheme} role="button">
          {isDarkMode ? <Light /> : <Dark />}
        </IconWrapper>
        <IconWrapper
          aria-label="alarm"
          onClick={() => {
            // TODO: 알림 이벤트 연동
          }}
          role="button"
        >
          <Bell />
        </IconWrapper>
        <IconWrapper
          aria-label="Add squad"
          role="button"
          onClick={handleCreateSquad}
          disabled={location.pathname === '/'}
        >
          <Add />
        </IconWrapper>
      </div>
      <ModalContainer />
    </header>
  );
};

export default Header;

const headerContainer = (theme: Theme) => css`
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.white};
  padding: 0 16px;

  & svg {
    color: ${theme.colors.text};
  }
`;

const rightMenu = css`
  display: flex;
`;

const logoStyle = css`
  height: 36px;
`;
