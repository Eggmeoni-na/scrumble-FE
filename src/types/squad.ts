import { ROLE } from '@/constants/role';

export type squadRoleType = (typeof ROLE)[keyof typeof ROLE];

export type Squad = {
  squadId: number;
  squadName: string;
};

export type SquadDetail = {
  squadMembers: SquadMember[];
  mySquadMemberRole: squadRoleType;
} & Squad;

export type SquadMember = {
  memberId: number;
  profileImg: string | null;
  name: string;
  squadMemberRole: squadRoleType;
};
