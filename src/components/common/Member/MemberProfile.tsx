import { ROLE } from '@/constants/role';
import useUserCookie from '@/hooks/useUserCookie';

import { SquadMember } from '@/types';
import { Interpolation, Theme } from '@emotion/react';

type Props = {
  member: SquadMember;
  infoStyle: Interpolation<Theme>;
  imgStyle: Interpolation<Theme>;
  displayRole: boolean;
};

const MemberProfile = ({ member, infoStyle, imgStyle, displayRole }: Props) => {
  const { user } = useUserCookie();
  const { name, profileImg, memberId, squadMemberRole } = member;

  return (
    <div css={infoStyle}>
      <img css={imgStyle} src={profileImg ? profileImg : '/images/defaultImg.png'} alt="프로필 이미지" />
      <p>
        {name}
        {displayRole && <span>{squadMemberRole === ROLE.LEADER && ' 리더'}</span>}
        {displayRole && <span>{user?.id === memberId && ' (나)'}</span>}
      </p>
    </div>
  );
};

export default MemberProfile;
