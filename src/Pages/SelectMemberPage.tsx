import SelectMemberList from '@/components/common/Member/SelectMemberList';
import { useParams } from 'react-router-dom';

const SelectMemberPage = () => {
  const param = useParams();

  return <SelectMemberList squadId={Number(param.squadId)} />;
};

export default SelectMemberPage;
