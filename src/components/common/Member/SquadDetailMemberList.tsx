import MemberProfile from '@/components/common/Member/MemberProfile';
import { scrollBarStyle } from '@/styles/globalStyles';
import { SquadMember } from '@/types';
import { css, Theme } from '@emotion/react';

type Props = {
  squadMembers: SquadMember[];
};

const SquadDetailMemberList = ({ squadMembers }: Props) => {
  return (
    <ul css={containerStyle}>
      {squadMembers.map((member) => (
        <Member key={member.memberId} member={member} />
      ))}
    </ul>
  );
};

export default SquadDetailMemberList;

const Member = ({ member }: { member: SquadMember }) => {
  return (
    <li>
      <MemberProfile member={member} infoStyle={infoStyle} imgStyle={imgStyle} displayRole={false} />
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

const imgStyle = css`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const infoStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  & p {
    ${theme.typography.size_10}
    font-weight: 500;
  }
`;
