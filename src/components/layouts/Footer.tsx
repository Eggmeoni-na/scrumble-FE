import { css } from '@emotion/react';

const Footer = () => {
  return <footer css={FooterContainer}>Footer</footer>;
};

export default Footer;

const FooterContainer = css`
  height: 83px;
  background-color: yellow;
`;
