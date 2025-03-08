import { Exit } from '@/assets/icons';
import { IconWrapper } from '@/components';
import { MemberProfile } from '@/components/Member';
import { commonButtonStyle } from '@/components/common/Sidebar/style';
import { ROLE } from '@/constants/role';
import { MEMBER_STYLE_TYPE } from '@/constants/squad';
import { useRemoveUserFromSquad } from '@/hooks/mutations';
import { squadKeys } from '@/hooks/queries';
import { useSquadStore, useToastStore } from '@/stores';
import { pcMediaQuery } from '@/styles/breakpoints';
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

  return (
    <ul css={containerStyle}>
      {members.map((member) => (
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
      <li css={itemStyle(showIcon)}>
        <MemberProfile member={member} displayRole type={MEMBER_STYLE_TYPE.DEFAULT} />
        {showIcon && (
          <IconWrapper
            aria-label={`${member.name} 강퇴`}
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

const containerStyle = css`
  overflow-y: auto;
  height: 180px;

  ${pcMediaQuery(css`
    height: 260px;
  `)}
`;

const itemStyle = (isLeader: boolean) => css`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${isLeader &&
  `
    :hover {
      border-radius: 8px;
      background-color: var(--color-hover);
    }
    `}
`;
