import { deleteUser, editNickname, logoutUser } from '@/apis';
import { Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button } from '@/components/common';
import { ActionModal } from '@/components/common/Modal';
import { useModal, useToastHandler, useUserCookie } from '@/hooks';
import { userQueries } from '@/hooks/queries';
import { handleKeyDown } from '@/utils';
import { css, Theme } from '@emotion/react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const { user: profile, setCookie, clearCookie } = useUserCookie();
  const { successToast, failedToast } = useToastHandler();
  const [newNickname, setNewNickname] = useState(profile?.name || '');
  const [isEditNickname, setIsEditNickname] = useState(false);
  const { ModalContainer: DeleteUserModal, openModal } = useModal();

  const { data: user } = useSuspenseQuery(userQueries()).data;
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      successToast('회원탈퇴에 성공했어요');
      clearCookie();
      navigate('/login');
    },
    onError: () => failedToast('잠시 후 다시 시도해주세요'),
  });

  const handleEditNickname = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNickname.trim() !== profile?.name) {
      try {
        const res = await editNickname(newNickname);
        if (res.statusCodeValue === 200) {
          setCookie('user', { id: profile?.id, name: newNickname });
        }
      } catch {
        failedToast('닉네임 변경에 실패했어요');
      }
    }
    setIsEditNickname(false);
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      clearCookie();
      navigate('/login');
      return;
    }
  };

  const handleDeleteUser = async () => {
    const res = await openModal(ActionModal, undefined, {
      type: 'delete',
      text: '회원탈퇴',
      message: '회원 탈퇴 시 모든 이력이 삭제됩니다.\n정말 탈퇴하시겠어요?',
      displayCancel: true,
    });

    if (res.ok) {
      deleteUserMutate();
    }
  };

  return (
    <div css={containerStyle}>
      <h1>내 정보</h1>

      <section css={userInfoStyle}>
        <h3>계정</h3>
        <div>
          <p>{user.email}</p>
          <Button text="로그아웃" onClick={handleLogout} aria-label="로그아웃" css={logoutButtonStyle} />
        </div>
      </section>

      <section css={nicknameStyle}>
        <h3>닉네임</h3>
        {!isEditNickname ? (
          <div>
            <p>{profile?.name}</p>
            <IconWrapper onClick={() => setIsEditNickname(true)} aria-label="닉네임 수정" style={{ width: '24px' }}>
              <Edit />
            </IconWrapper>
          </div>
        ) : (
          <form css={editNicknameActionStyle} onSubmit={handleEditNickname}>
            <input value={newNickname} onChange={(e) => setNewNickname(e.target.value)} autoFocus />
            <Button text="수정" aria-label="닉네임 수정" style={{ backgroundColor: '#FFD700', color: '#616161' }} />
            <Button
              text="취소"
              variant="default"
              onClick={() => {
                setNewNickname(profile?.name || '');
                setIsEditNickname(false);
              }}
              aria-label="닉네임 수정 취소"
            />
          </form>
        )}
      </section>

      <section css={deleteUserButtonStyle}>
        <span
          onClick={handleDeleteUser}
          onKeyDown={(e) => handleKeyDown(e, handleDeleteUser)}
          tabIndex={0}
          role="button"
        >
          회원탈퇴
        </span>
      </section>
      <DeleteUserModal />
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
    ${theme.typography.size_24}
    margin-bottom: 12px;
  }
`;

const userInfoStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  & div {
    display: flex;
  }

  & p {
    flex: 2;
    margin-top: 12px;
  }
`;

const logoutButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.black.black300};
  flex: 0.5;
`;

const nicknameStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 24px;

  & p {
    height: 12px;
  }

  & div {
    display: flex;
    align-items: center;
  }

  & input {
    width: 100%;
    height: 40px;
    max-width: 240px;
    background-color: #fff;
    border-radius: 6px;
    margin: 16px 8px 16px 0;
    padding: 0 8px;
  }
`;

const editNicknameActionStyle = css`
  display: flex;
  align-items: center;

  & button {
    width: 72px;
    height: 40px;
    margin-right: 4px;
  }
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
