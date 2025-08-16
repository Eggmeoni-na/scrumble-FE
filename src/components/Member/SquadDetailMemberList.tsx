import { MemberProfile } from '@/components/Member';
import { MEMBER_STYLE_TYPE } from '@/constants/squad';
import { useUserCookie } from '@/hooks';
import { useMemberStore } from '@/stores';
import { fullSizeButtonStyle, scrollBarStyle } from '@/styles/globalStyles';
import { SquadMember } from '@/types';
import { css } from '@emotion/react';
import { memo } from 'react';

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

export default memo(SquadDetailMemberList);

const Member = ({ member }: { member: SquadMember }) => {
  const { selectedMember, setSelectedMember } = useMemberStore((state) => state);
  return (
    <li css={memberStyle}>
      <button onClick={() => setSelectedMember(member)} style={fullSizeButtonStyle} aria-label={selectedMember?.name}>
        <MemberProfile
          member={member}
          selectedMember={selectedMember}
          displayRole={false}
          type={MEMBER_STYLE_TYPE.SQUAD_DETIAL}
        />
      </button>
    </li>
  );
};

const containerStyle = css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 16px;
  overflow-x: auto;
  ${scrollBarStyle}
`;

const memberStyle = css`
  cursor: pointer;

  & button {
    padding: 0;
  }
`;
