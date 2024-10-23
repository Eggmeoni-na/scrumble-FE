import { Exit } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import MemberProfile from '@/components/common/Member/MemberProfile';
import { commonButtonStyle } from '@/components/common/Sidebar';
import { ROLE } from '@/constants/role';
import { useRemoveUserFromSquad } from '@/hooks/mutations';
import { squadKeys } from '@/hooks/queries/useSquad';
import useUserCookie from '@/hooks/useUserCookie';
import { useSquadStore, useToastStore } from '@/stores';
import { SquadMember } from '@/types';
import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';

const SidebarMemberList = ({
  members,
  myRole,
}: {
  members: SquadMember[];
  myRole: (typeof ROLE)[keyof typeof ROLE];
}) => {
  const isLeader = myRole === ROLE.LEADER;
  const { user } = useUserCookie();

  const sortedMembers = [...members].sort((a) => (a.memberId === user?.id ? -1 : 0));

  return (
    <ul>
      {sortedMembers.map((member) => (
        <Member key={member.memberId} member={member} showIcon={isLeader && member.squadMemberRole === ROLE.NORMAL} />
      ))}
    </ul>
  );
};

export default SidebarMemberList;

const Member = ({ member, showIcon }: { member: SquadMember; showIcon: boolean }) => {
  const squadId = useSquadStore((state) => state.currentSquadId);
  const createToast = useToastStore((state) => state.createToast);
  const queryClient = useQueryClient();
  const { RemoveUserActionPrompt, handleRemoveUser } = useRemoveUserFromSquad(squadId, member, {
    onSuccess: () => {
      createToast({
        type: 'success',
        message: `${member.name}님이 스쿼드에서 강퇴되었어요`,
        duration: 2000,
        showCloseButton: false,
      });
      queryClient.refetchQueries({
        queryKey: squadKeys.squadDetail(squadId),
      });
    },
    onError: () => createToast({ type: 'failed', message: '잠시 후 다시 시도해주세요 😢' }),
  });

  return (
    <>
      <li>
        <MemberProfile member={member} infoStyle={infoStyle} imgStyle={imgStyle} displayRole />
        {showIcon && (
          <IconWrapper
            aria-label="Remove member from squad"
            onClick={handleRemoveUser}
            role="button"
            css={commonButtonStyle}
          >
            <Exit />
          </IconWrapper>
        )}
      </li>
      <RemoveUserActionPrompt />
    </>
  );
};

const imgStyle = css`
  width: 36px;
  height: 36px;
  border-radius: 16px;
`;

const infoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;
