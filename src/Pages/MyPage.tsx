import { getUser } from '@/apis';
import Button from '@/components/common/Button/Button';
import { css, Theme } from '@emotion/react';
import { useSuspenseQuery } from '@tanstack/react-query';

const MyPage = () => {
  const { data: user } = useSuspenseQuery({
    queryKey: ['me'],
    queryFn: getUser,
  }).data;

  const handleLogout = () => {
    // TODO: 로그아웃 API 연동
  };

  const handleDeleteUser = () => {
    // TODO: 회원 탈퇴 API 연동
  };

  return (
    <div css={containerStyle}>
      <h1>내 정보</h1>
      <div css={userInfoStyle}>
        <p>{user.email}</p>
        <Button text="로그아웃" onClick={handleLogout} aria-label="로그아웃" css={logoutButtonStyle} />
      </div>
      <div css={deleteUserButtonStyle}>
        <span onClick={handleDeleteUser}>회원탈퇴</span>
      </div>
    </div>
  );
};

export default MyPage;

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 32px;
  padding: 24px 0;

  & h1 {
    font-size: ${theme.typography.size_24};
    margin-bottom: 12px;
  }
`;

const userInfoStyle = css`
  display: flex;
  justify-content: space-between;

  & p {
    flex: 2;
    margin-top: 12px;
  }
`;

const logoutButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.secondary};
  color: white;

  flex: 0.5;
`;

const deleteUserButtonStyle = (theme: Theme) => css`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: auto;

  & span {
    color: ${theme.colors.gray.gray200};
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  }
`;
