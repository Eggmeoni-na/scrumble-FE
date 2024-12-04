import { SelectMemberList } from '@/components/Member';
import { useSquadStore } from '@/stores';

const SelectMemberPage = () => {
  const squadId = useSquadStore((state) => state.currentSquadId);

  return <SelectMemberList squadId={squadId} />;
};

export default SelectMemberPage;
