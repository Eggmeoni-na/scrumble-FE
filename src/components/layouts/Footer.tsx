import { css } from '@emotion/react';

const Footer = () => {
  return <footer css={footerContainer}>Footer</footer>;
};

export default Footer;

const footerContainer = css`
  height: 83px;
  background-color: yellow;
`;
