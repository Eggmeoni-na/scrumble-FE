import { Pouch, Target, User } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer css={footerContainer}>
      <Link to={'/squad'} css={menuIcon}>
        <IconWrapper name="squad">
          <Target />
        </IconWrapper>
        <p>스쿼드</p>
      </Link>
      <Link to={'/'} css={homeIcon}>
        <IconWrapper name="home and my todos">
          <Pouch />
        </IconWrapper>
      </Link>
      <Link to={'/me'} css={menuIcon}>
        <IconWrapper name="account">
          <User />
        </IconWrapper>
        <p>계정</p>
      </Link>
    </footer>
  );
};

export default Footer;

const footerContainer = (theme: Theme) => css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 83px;
  background-color: ${theme.colors.background.white};
`;

const menuIcon = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: ${theme.colors.primary};

  p {
    color: ${theme.colors.gray.gray300};
  }
`;

const homeIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-image: linear-gradient(180deg, #fd0 0%, #fbb034 100%);
  border-radius: 50%;
  color: white;
  stroke: none;
`;
