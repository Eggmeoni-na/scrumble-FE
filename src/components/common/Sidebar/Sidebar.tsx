import { Close, Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { SidebarMemberList } from '@/components/Member';
import { Overlay } from '@/components/common/Overlay';
import { ROLE } from '@/constants/role';
import { useUserCookie } from '@/hooks';
import { useDeleteSquad, useExitSquad, useUpdateSquadName } from '@/hooks/mutations';
import { squadDetailQueryOptions, squadKeys } from '@/hooks/queries';
import { useSquadStore, useToastStore } from '@/stores';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { getPriority } from '@/utils';
import { css, Theme } from '@emotion/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ closeSidebar }: { closeSidebar: VoidFunction }) => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const navigate = useNavigate();
  const createToast = useToastStore((state) => state.createToast);
  const { user } = useUserCookie();

  const { data: squadDetail } = useSuspenseQuery({
    ...squadDetailQueryOptions(squadId),
    select: (data) => ({
      ...data,
      squadMembers: data.data.squadMembers.sort((a, b) => getPriority(a, user!.id) - getPriority(b, user!.id)),
    }),
    refetchOnMount: false,
  }).data;

  const { squadName, squadMembers, mySquadMemberRole } = squadDetail;
  const isLeader = mySquadMemberRole === ROLE.LEADER;

  const queryClient = useQueryClient();
  const { UpdateSquadNameModal, handleUpdateSquadName } = useUpdateSquadName(squadId, {
    onSuccess: async () => {
      createToast({ type: 'success', message: '스쿼드명이 수정되었어요', duration: 2000, showCloseButton: false });
      queryClient.refetchQueries({
        queryKey: squadKeys.squadDetail(squadId),
      });
    },
    onError: () => createToast({ type: 'failed', message: '스쿼드명 수정에 실패했어요 😢' }),
  });

  const { DeleteSquadModal, handleSquadDelete } = useDeleteSquad(squadId, {
    onSuccess: () => {
      createToast({ type: 'success', message: '스쿼드 삭제 성공!' });
      navigate('/squads');
    },
    onError: () => createToast({ type: 'failed', message: '스쿼드 삭제에 실패했어요 😢' }),
  });

  const hasMembers = squadMembers.length > 1;
  const { ExitSquadModal, handleSquadExit } = useExitSquad(squadId, isLeader, hasMembers, {
    onSuccess: () => {
      createToast({ type: 'success', message: '스쿼드에서 나왔어요' });
      navigate('/squads');
    },
    onError: () => createToast({ type: 'failed', message: '스쿼드 나가기에 실패했어요 😢' }),
  });

  const handleInvitation = () => {
    closeSidebar();
    navigate(`/squads/${squadId}/invite?step=invite`);
  };

  const handleAssignLeader = () => {
    closeSidebar();
    navigate(`/squads/${squadId}/members?step=assign`);
  };

  return (
    <Overlay
      preventClick={false}
      onClose={closeSidebar}
      style={{
        justifyContent: 'flex-end',
      }}
    >
      <dialog css={sidebarContainer}>
        <header css={headerStyle}>
          <h1>스쿼드 관리</h1>
          <IconWrapper aria-label="사이드바 닫기" onClick={closeSidebar} role="button" css={commonButtonStyle}>
            <Close />
          </IconWrapper>
        </header>
        <section css={squadInfoStyle}>
          <h2 id="squad-detail">스쿼드명</h2>
          <div>
            <h3>{squadName}</h3>
            <IconWrapper
              aria-label="스쿼드명 수정"
              onClick={handleUpdateSquadName}
              role="button"
              css={commonButtonStyle}
              disabled={!isLeader}
            >
              <Edit />
            </IconWrapper>
          </div>
        </section>
        <section css={membersStyle}>
          <h2 id="squad-members">멤버</h2>
          <SidebarMemberList members={squadMembers} myRole={squadDetail.mySquadMemberRole} />
        </section>
        <section css={settingsStyle}>
          <h2 id="squad-settings">설정</h2>
          <ul>
            <li>
              <button onClick={handleInvitation} style={fullSizeButtonStyle} aria-label="멤버 초대">
                멤버 초대
              </button>
            </li>
            {isLeader && (
              <li>
                <button onClick={handleAssignLeader} style={fullSizeButtonStyle} aria-label="리더 변경">
                  리더 변경
                </button>
              </li>
            )}
            {isLeader && (
              <li>
                <button onClick={handleSquadDelete} style={fullSizeButtonStyle} aria-label="스쿼드 삭제">
                  스쿼드 삭제
                </button>
              </li>
            )}
          </ul>
        </section>
        <button css={exitButtonStyle} onClick={handleSquadExit}>
          나가기
        </button>
      </dialog>
      <UpdateSquadNameModal />
      <DeleteSquadModal />
      <ExitSquadModal />
    </Overlay>
  );
};

export const commonButtonStyle = (theme: Theme) => css`
  width: 28px;
  height: 28px;
  color: ${theme.colors.text};
`;

export const sidebarContainer = (theme: Theme) => css`
  width: 300px;
  height: 100%;
  background-color: ${theme.colors.background.white};
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;

  & h2 {
    font-size: ${theme.typography.size_18};
    font-weight: 600;
  }

  & h2::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.gray.gray100};
    margin-top: 8px;
  }
`;

export const headerStyle = (theme: Theme) => css`
  font-size: ${theme.typography.size_24};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 16px;
`;

const squadInfoStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
  padding: 0 16px;

  & h3 {
    font-weight: 400;
  }

  & div {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  & span {
    font-size: ${theme.typography.size_14};
    color: ${theme.colors.gray.gray300};
  }
`;

const membersStyle = css`
  padding: 0 16px;
  margin-bottom: 24px;

  & h2 {
    margin-bottom: 12px;
  }
`;

const settingsStyle = (theme: Theme) => css`
  padding: 0 16px;
  flex: 1;
  margin-bottom: 24px;

  & h2 {
    margin-bottom: 12px;
  }

  & li {
    padding: 8px 0;
    cursor: pointer;
  }

  & li:hover {
    opacity: 0.5;
  }

  & button {
    text-align: left;
    font-size: ${theme.typography.size_16};
  }
`;

const exitButtonStyle = (theme: Theme) => css`
  background-color: ${theme.colors.background.white};
  ${theme.typography.size_14}
  color: ${theme.colors.gray.gray200};
  border-top: 1px solid ${theme.colors.gray.gray200};
  font-weight: 700;
  margin-top: auto;
  height: 56px;
  text-align: left;
  padding: 12px 16px;
`;
