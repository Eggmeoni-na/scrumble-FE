import { ROLE } from '@/constants/role';
import { MEMBER_STYLE_TYPE } from '@/constants/squad';
import { useUserCookie } from '@/hooks';
import { ellipsisStyle } from '@/styles/globalStyles';
import { SquadMember } from '@/types';
import { css, Theme } from '@emotion/react';

type Props = {
  member: SquadMember;
  displayRole: boolean;
  type: (typeof MEMBER_STYLE_TYPE)[keyof typeof MEMBER_STYLE_TYPE];
  selectedMember?: SquadMember | null;
};

const DEFAULT_PROFILE_IMG = '/images/defaultImg.png';

const MemberProfile = ({ member, selectedMember, displayRole, type }: Props) => {
  const { user } = useUserCookie();
  const { name, profileImg, memberId, squadMemberRole } = member;
  const activeMemberId = selectedMember?.memberId ?? user!.id;
  const isSquadDetail = type === MEMBER_STYLE_TYPE.SQUAD_DETIAL;

  return (
    <div css={infoStyle}>
      {isSquadDetail && (
        <div css={[imgContainerStyle, activeMemberId === memberId ? activeStyle : inactiveStyle]}>
          <img css={imgStyle} src={profileImg ? profileImg : DEFAULT_PROFILE_IMG} alt={`${name}님의 프로필 이미지`} />
        </div>
      )}
      <p css={[isSquadDetail ? detailNameStyle : sidebarNameStyle, ellipsisStyle]}>
        {name}
        {displayRole && (
          <>
            {user?.id === memberId && <span css={meStyle}> (나)</span>}
            {squadMemberRole === ROLE.LEADER && <span> 🐓</span>}
          </>
        )}
      </p>
    </div>
  );
};

export default MemberProfile;

const infoStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const detailNameStyle = css`
  font-size: 12px;
  font-weight: 500;
  width: 64px;
`;

const sidebarNameStyle = (theme: Theme) => css`
  ${theme.typography.size_16}
`;

const imgContainerStyle = css`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imgStyle = (theme: Theme) => css`
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 50%;
  border: 2.5px solid ${theme.colors.background.white};
`;

const activeStyle = css`
  background: linear-gradient(90deg, rgb(255, 126, 0) 10%, rgba(255, 191, 0, 1) 72%, rgba(255, 246, 0, 1) 100%);
  border-radius: 50%;
`;

const inactiveStyle = css`
  opacity: 50%;
`;

const meStyle = (theme: Theme) => css`
  ${theme.typography.size_14}
  font-weight: 400;
  color: ${theme.colors.gray.gray200};
`;
