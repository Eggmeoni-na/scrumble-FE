import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const SquadDetailPage = () => {
  const { squadId } = useParams();
  const { data: squadDetail } = useSuspenseQuery({
    ...squadDetailQueryOptions(Number(squadId)),
    staleTime: 300000,
  }).data;

  return <div>SquadDetailPage</div>;
};

export default SquadDetailPage;
