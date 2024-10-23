import { Back, Bell, Dark, Light, Menu } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { useThemeStore } from '@/stores';
import { css, Theme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeaderTemplate = ({ children }: PropsWithChildren) => {
  return <header css={headerContainer}>{children}</header>;
};

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div css={leftMenu}>
      <IconWrapper aria-label="Go to back" role="button" onClick={handleBack} disabled={location.pathname === '/'}>
        <Back />
      </IconWrapper>
      {location.pathname === '/' && <img css={logoStyle} src="./images/logo.png" alt="logo" />}
    </div>
  );
};

const RightMenuWrapper = ({ children }: PropsWithChildren) => {
  return <div css={rightMenu}>{children}</div>;
};

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);

  return (
    <IconWrapper aria-label="Toggle theme" onClick={toggleTheme} role="button">
      {isDarkMode ? <Light /> : <Dark />}
    </IconWrapper>
  );
};

const AlarmButton = () => {
  return (
    <IconWrapper
      aria-label="alarm"
      onClick={() => {
        // TODO: 알림 이벤트 연동
      }}
      role="button"
    >
      <Bell />
    </IconWrapper>
  );
};

const SidebarToggleButton = ({ toggleSidebar }: { toggleSidebar: VoidFunction }) => {
  return (
    <IconWrapper
      aria-label="menu"
      onClick={() => {
        toggleSidebar();
      }}
      role="button"
    >
      <Menu />
    </IconWrapper>
  );
};

HeaderTemplate.BackButton = BackButton;
HeaderTemplate.RightMenuWrapper = RightMenuWrapper;
HeaderTemplate.ToggleThemeButton = ToggleThemeButton;
HeaderTemplate.AlarmButton = AlarmButton;
HeaderTemplate.SidebarToggleButton = SidebarToggleButton;

const headerContainer = (theme: Theme) => css`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.white};
  padding: 0 16px;

  & svg {
    color: ${theme.colors.text};
  }
`;

const leftMenu = css`
  width: 30%;
`;

const rightMenu = css`
  display: flex;
  justify-content: flex-end;
  width: 30%;
`;

const logoStyle = css`
  height: 36px;
`;
