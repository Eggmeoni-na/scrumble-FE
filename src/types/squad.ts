export type Squad = {
  squadId: number;
  squadName: string;
};

export type SquadDetail = {
  squadMembers: [
    {
      memberId: number;
      name: string;
      profileImg: '';
    },
  ];
} & Squad;
