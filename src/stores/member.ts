import { SquadMember } from '@/types';
import { create } from 'zustand';

type MemberState = {
  selectedMember: SquadMember | null;
  setSelectedMember: (member: SquadMember | null) => void;
};

export const useMemberStore = create<MemberState>((set) => ({
  selectedMember: null,
  setSelectedMember: (member) => set({ selectedMember: member }),
}));
