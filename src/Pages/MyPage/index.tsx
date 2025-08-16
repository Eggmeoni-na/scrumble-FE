import { deleteUser, editNickname, logoutUser } from '@/apis';
import { Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { Button } from '@/components/common';
import { ActionModal } from '@/components/common/Modal';
import { useModal, useToastHandler, useUserCookie } from '@/hooks';
import { userQueries } from '@/hooks/queries';
import {
  containerStyle,
  deleteUserButtonStyle,
  editNicknameActionStyle,
  logoutButtonStyle,
  nicknameStyle,
  userInfoStyle,
} from '@/Pages/MyPage/style';
import { ApiResponse } from '@/types';
import { handleKeyDown } from '@/utils';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const { user: profile, setCookie, clearCookie } = useUserCookie();
  const { successToast, failedToast } = useToastHandler();
  const [newNickname, setNewNickname] = useState(profile?.name || '');
  const [isEditNickname, setIsEditNickname] = useState(false);
  const { ModalContainer: DeleteUserModal, openModal: deleteUserModalOpen } = useModal();
  const { ModalContainer: ConfirmLeaderModal, openModal: confirmLeaderModalOpen } = useModal();

  const { data: user } = useSuspenseQuery(userQueries()).data;

  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      successToast('회원탈퇴에 성공했어요');
      clearCookie();
      navigate('/login');
    },
    onError: async (err: AxiosError<ApiResponse<null>>) => {
      if (err.response?.data.statusCodeValue === 403) {
        await confirmLeaderModalOpen(ActionModal, undefined, {
          type: 'confirm',
          text: '확인',
          message: '리더로 참여중인 스쿼드가 있어요.\n리더 위임 후 다시 시도해주세요.',
          displayCancel: false,
        });
        return;
      }

      failedToast('잠시 후 다시 시도해주세요');
    },
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
    const res = await deleteUserModalOpen(ActionModal, undefined, {
      type: 'delete',
      text: '회원탈퇴',
      message: '회원 탈퇴 시 모든 이력이 삭제됩니다.\n정말 탈퇴하시겠어요?',
      displayCancel: true,
    });

    if (!res.ok) return;

    deleteUserMutate();
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
      <ConfirmLeaderModal />
    </div>
  );
};

export default MyPage;
