import { css } from '@emotion/react';

const Header = () => {
  return <header css={HeaderContainer}>Header</header>;
};

export default Header;

const HeaderContainer = css`
  height: 52px;
  background-color: red;
`;
