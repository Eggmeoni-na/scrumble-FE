export type Squad = {
  squadId: number;
  squadName: string;
};

export type SquadDetail = {
  squadMembers: SquadMember[];
} & Squad;

export type SquadMember = {
  memberId: number;
  name: string;
  profileImg: '';
};
