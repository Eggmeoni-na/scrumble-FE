import { Back, Bell, Dark, Light } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { useThemeStore } from '@/stores/theme';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

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
      </div>
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
  justify-content: flex-end;
  width: 25%;
`;

const logoStyle = css`
  height: 36px;
`;
