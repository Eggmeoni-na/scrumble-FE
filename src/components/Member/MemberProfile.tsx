import { ROLE } from '@/constants/role';
import { MEMBER_STYLE_TYPE } from '@/constants/squad';
import { useUserCookie } from '@/hooks';
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
  const activeMember = selectedMember ?? user;
  const isSquadDetail = type === MEMBER_STYLE_TYPE.SQUAD_DETIAL;

  return (
    <div css={infoStyle}>
      {isSquadDetail && (
        <div css={activeMember?.name === name ? activeStyle : inactiveStyle}>
          <img css={imgStyle} src={profileImg ? profileImg : DEFAULT_PROFILE_IMG} alt={`${name}님의 프로필 이미지`} />
        </div>
      )}
      <p css={isSquadDetail ? detailNameStyle : sidebarNameStyle}>
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
  gap: 4px;
`;

const detailNameStyle = (theme: Theme) => css`
  ${theme.typography.size_10}
  width: 42px;
  text-align: center;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
`;

const sidebarNameStyle = (theme: Theme) => css`
  ${theme.typography.size_16}
`;

const imgStyle = (theme: Theme) => css`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
  border: 3.5px solid ${theme.colors.background.white};
`;

const activeStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, rgb(255, 126, 0) 10%, rgba(255, 191, 0, 1) 72%, rgba(255, 246, 0, 1) 100%);
  border-radius: 50%;
  width: 64px;
  height: 64px;
`;

const inactiveStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 50%;
`;

const meStyle = (theme: Theme) => css`
  ${theme.typography.size_14}
  font-weight: 400;
  color: ${theme.colors.gray.gray200};
`;
