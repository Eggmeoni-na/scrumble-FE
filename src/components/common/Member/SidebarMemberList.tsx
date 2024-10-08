import { Exit } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import MemberProfile from '@/components/common/Member/MemberProfile';
import { commonButtonStyle } from '@/components/common/Sidebar';
import { ROLE } from '@/constants/role';
import { SquadMember } from '@/types';
import { css } from '@emotion/react';

const SidebarMemberList = ({ members }: { members: SquadMember[] }) => {
  return (
    <ul>
      {members.map((member) => (
        <Member key={member.memberId} member={member} />
      ))}
    </ul>
  );
};

export default SidebarMemberList;

const Member = ({ member }: { member: SquadMember }) => {
  const role = 'leader';

  return (
    <li>
      <MemberProfile member={member} infoStyle={infoStyle} imgStyle={imgStyle} displayRole />
      <IconWrapper
        aria-label="Remove member from squad"
        onClick={() => {
          // TODO: 멤버 강퇴 모달 열기
        }}
        role="button"
        css={commonButtonStyle}
        disabled={role !== ROLE.LEADER}
      >
        <Exit />
      </IconWrapper>
    </li>
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
