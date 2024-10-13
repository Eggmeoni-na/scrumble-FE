import { Pouch, Target, User } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import { css, Theme } from '@emotion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer css={footerContainer}>
      <Link to="/squads" css={menuIcon} aria-label="Go to squads">
        <IconWrapper>
          <Target />
        </IconWrapper>
        <span>스쿼드</span>
      </Link>
      <Link to="/" css={homeIcon} aria-label="Go to home">
        <IconWrapper>
          <Pouch />
        </IconWrapper>
      </Link>
      <Link to="/me" css={menuIcon} aria-label="Go to my">
        <IconWrapper>
          <User />
        </IconWrapper>
        <span>계정</span>
      </Link>
    </footer>
  );
};

export default Footer;

const footerContainer = (theme: Theme) => css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 56px;
  background-color: ${theme.colors.background.white};
  -webkit-box-shadow: 0px -6px 17px -3px rgba(96, 96, 96, 0.16);
  box-shadow: 0px -6px 17px -3px rgba(96, 96, 96, 0.16);
`;

const menuIcon = (theme: Theme) => css`
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: ${theme.colors.primary};
  ${theme.typography.size_10}
  font-weight: 500;

  span {
    color: ${theme.colors.gray.gray300};
  }
`;

const homeIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background-image: linear-gradient(180deg, #fd0 0%, #fbb034 100%);
  border-radius: 50%;
  color: white;
  stroke: none;
`;
