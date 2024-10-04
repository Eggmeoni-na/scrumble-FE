import { Add, Back, Bell, Dark, Light } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { useThemeStore } from '@/stores/theme';
import { css, Theme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);
  const handleCreateSquad = async () => {
    const squadName = window.prompt('스쿼드명을 입력하세요.');
    if (!squadName) return;
  };

  return (
    <header css={headerContainer}>
      <div>
        <IconWrapper aria-label="Go to back" role="button" onClick={handleBack} disabled={location.pathname === '/'}>
          <Back />
        </IconWrapper>
      </div>
      <div css={rightMenu}>
        <IconWrapper aria-label="Toggle theme" onClick={toggleTheme} role="button">
          {isDarkMode ? <Dark /> : <Light />}
        </IconWrapper>
        <IconWrapper aria-label="alarm" role="button">
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
  color: ${theme.colors.text};
`;

const rightMenu = css`
  display: flex;
`;
