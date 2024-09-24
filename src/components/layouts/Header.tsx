import { Add, Back, Bell, Dark, Light } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { useThemeStore } from '@/stores/theme';
import { css, Theme } from '@emotion/react';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore((state) => state);
  return (
    <header css={headerContainer}>
      <IconWrapper name="Back">
        <Back />
      </IconWrapper>
      <div css={rightMenu}>
        <IconWrapper name="Theme" onClick={toggleTheme}>
          {isDarkMode ? <Dark /> : <Light />}
        </IconWrapper>
        <IconWrapper name="Alarm">
          <Bell />
        </IconWrapper>
        <IconWrapper name="Add squad">
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
