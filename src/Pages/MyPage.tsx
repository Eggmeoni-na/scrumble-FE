import { deleteUser, logoutUser } from '@/apis';
import { Button } from '@/components/common';
import { useToastHandler, useUserCookie } from '@/hooks';
import { userQueries } from '@/hooks/queries';
import { handleKeyDown } from '@/utils';
import { css, Theme } from '@emotion/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const { clearCookie } = useUserCookie();
  const { successToast, failedToast } = useToastHandler();
  const { data: user } = useSuspenseQuery(userQueries()).data;
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      successToast('회원탈퇴에 성공했어요');
      navigate('/login');
    },
    onError: () => failedToast('잠시 후 다시 시도해주세요'),
  });

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      clearCookie();
      navigate('/login');
      return;
    }
  };

  const handleDeleteUser = () => deleteUserMutate();

  return (
    <div css={containerStyle}>
      <h1>내 정보</h1>
      <div css={userInfoStyle}>
        <p>{user.email}</p>
        <Button text="로그아웃" onClick={handleLogout} aria-label="로그아웃" css={logoutButtonStyle} />
      </div>
      <div css={deleteUserButtonStyle}>
        <span
          onClick={handleDeleteUser}
          onKeyDown={(e) => handleKeyDown(e, handleDeleteUser)}
          tabIndex={0}
          role="button"
        >
          회원탈퇴
        </span>
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
