import { Close, Edit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { SidebarMemberList } from '@/components/Member';
import { Overlay } from '@/components/common';
import {
  commonButtonStyle,
  exitButtonStyle,
  headerStyle,
  membersStyle,
  settingsStyle,
  sidebarContainer,
  squadInfoStyle,
} from '@/components/common/Sidebar/style';
import { ROLE } from '@/constants/role';
import { useUserCookie } from '@/hooks';
import { useDeleteSquad, useExitSquad, useUpdateSquadName } from '@/hooks/mutations';
import { squadDetailQueryOptions, squadKeys } from '@/hooks/queries';
import { useSquadStore, useToastStore } from '@/stores';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { getPriority } from '@/utils';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ closeSidebar }: { closeSidebar: VoidFunction }) => {
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
  const { UpdateSquadNameModal, handleUpdateSquadName } = useUpdateSquadName(squadId, squadName, {
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
              <button onClick={handleInvitation} style={fullSizeButtonStyle}>
                멤버 초대
              </button>
            </li>
            {isLeader && (
              <li>
                <button onClick={handleAssignLeader} style={fullSizeButtonStyle}>
                  리더 변경
                </button>
              </li>
            )}
            {isLeader && (
              <li>
                <button onClick={handleSquadDelete} style={fullSizeButtonStyle}>
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

export default Sidebar;
