import { ROLE } from '@/constants/role';
import { SquadMember } from '@/types';

export const getPriority = (member: SquadMember, userId: number) => {
  if (member.squadMemberRole === ROLE.LEADER) return -2;
  if (member.memberId === userId) return -1;
  return 0;
};
