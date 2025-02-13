import { ActiveBell, Back, Bell, Dark, Light, Menu } from '@/assets/icons';
import { IconWrapper, Notification } from '@/components';
import { useNotificationStateContext } from '@/context/notification';

import { useOpenToggle } from '@/hooks';
import { useThemeStore } from '@/stores';
import { css, Theme } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeaderTemplate = ({ children }: PropsWithChildren) => <header css={headerContainer}>{children}</header>;

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div css={leftMenu}>
      <IconWrapper aria-label="뒤로가기" role="button" onClick={handleBack} disabled={location.pathname === '/'}>
        <Back />
      </IconWrapper>
      {location.pathname === '/' && <img css={logoStyle} src="./images/logo.png" alt="logo" />}
    </div>
  );
};

const RightMenuWrapper = ({ children }: PropsWithChildren) => <div css={rightMenu}>{children}</div>;

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);

  return (
    <IconWrapper aria-label="테마 변경" onClick={toggleTheme} role="button">
      {isDarkMode ? <Light /> : <Dark />}
    </IconWrapper>
  );
};

const NotificationsButton = () => {
  const { isOpen, toggleOpen } = useOpenToggle();
  const { hasUnreadMessages } = useNotificationStateContext();

  return (
    <>
      <IconWrapper aria-label="알림 조회" onClick={() => toggleOpen()} role="button">
        {hasUnreadMessages ? <ActiveBell /> : <Bell />}
      </IconWrapper>
      {isOpen && <Notification toggleOpen={toggleOpen} />}
    </>
  );
};

const SidebarToggleButton = ({ toggleSidebar }: { toggleSidebar: VoidFunction }) => (
  <IconWrapper aria-label="더보기 메뉴" onClick={() => toggleSidebar()} role="button">
    <Menu />
  </IconWrapper>
);

HeaderTemplate.BackButton = BackButton;
HeaderTemplate.RightMenuWrapper = RightMenuWrapper;
HeaderTemplate.ToggleThemeButton = ToggleThemeButton;
HeaderTemplate.NotificationsButton = NotificationsButton;
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
