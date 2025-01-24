import { MemberProfile } from '@/components/Member';
import { MEMBER_STYLE_TYPE } from '@/constants/squad';
import { useUserCookie } from '@/hooks';
import { useMemberStore } from '@/stores';
import { scrollBarStyle } from '@/styles/globalStyles';
import { SquadMember } from '@/types';
import { css } from '@emotion/react';

type Props = {
  squadMembers: SquadMember[];
};

const SquadDetailMemberList = ({ squadMembers }: Props) => {
  const { user } = useUserCookie();
  const sortedMembers = [...squadMembers].sort((a) => (a.memberId === user?.id ? -1 : 0));

  return (
    <ul css={containerStyle}>
      {sortedMembers.map((member) => (
        <Member key={member.memberId} member={member} />
      ))}
    </ul>
  );
};

export default SquadDetailMemberList;

const Member = ({ member }: { member: SquadMember }) => {
  const { selectedMember, setSelectedMember } = useMemberStore((state) => state);
  return (
    <li
      onClick={() => setSelectedMember(member)}
      css={memberStyle}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setSelectedMember(member);
        }
      }}
      tabIndex={0}
      role="button"
    >
      <MemberProfile
        member={member}
        selectedMember={selectedMember}
        displayRole={false}
        type={MEMBER_STYLE_TYPE.SQUAD_DETIAL}
      />
    </li>
  );
};

const containerStyle = css`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 16px;
  overflow-x: auto;
  ${scrollBarStyle}
`;

const memberStyle = css`
  cursor: pointer;
`;
