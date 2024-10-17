import SelectMemberList from '@/components/common/Member/SelectMemberList';
import { useSquadStore } from '@/stores/squad';

const SelectMemberPage = () => {
  const squadId = useSquadStore((state) => state.currentSquadId);

  return <SelectMemberList squadId={squadId} />;
};

export default SelectMemberPage;
