import { ROLE } from '@/constants/role';

export type Squad = {
  squadId: number;
  squadName: string;
};

export type SquadDetail = {
  squadMembers: SquadMember[];
  mySquadMemberRole: (typeof ROLE)[keyof typeof ROLE];
} & Squad;

export type SquadMember = {
  memberId: number;
  profileImg: string | null;
  name: string;
  squadMemberRole: (typeof ROLE)[keyof typeof ROLE];
};
