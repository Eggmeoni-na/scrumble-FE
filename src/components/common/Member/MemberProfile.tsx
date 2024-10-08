import { SquadMember } from '@/types';
import { Interpolation, Theme } from '@emotion/react';

type Props = {
  member: SquadMember;
  infoStyle: Interpolation<Theme>;
  imgStyle: Interpolation<Theme>;
  displayRole: boolean;
};

const MemberProfile = ({ member, infoStyle, imgStyle, displayRole }: Props) => {
  const { name, profileImg } = member;

  return (
    <div css={infoStyle}>
      <img css={imgStyle} src={profileImg ? profileImg : '/images/defaultImg.png'} alt="프로필 이미지" />
      <p>
        {name}
        {displayRole && <span> 리더</span>}
        {displayRole && <span> (나)</span>}
      </p>
    </div>
  );
};

export default MemberProfile;
