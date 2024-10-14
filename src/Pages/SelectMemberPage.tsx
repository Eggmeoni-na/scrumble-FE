import SelectMemberList from '@/components/common/Member/SelectMemberList';
import { useParams } from 'react-router-dom';

const SelectMemberPage = () => {
  const params = useParams();

  return <SelectMemberList squadId={Number(params.squadId)} />;
};

export default SelectMemberPage;
