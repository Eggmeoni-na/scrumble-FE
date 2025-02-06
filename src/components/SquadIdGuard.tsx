import { useSquadStore } from '@/stores';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const SquadIdGuard = () => {
  const { squadId } = useParams();
  const currentSquadId = useSquadStore((state) => state.currentSquadId);

  if (!currentSquadId || currentSquadId.toString() !== squadId) {
    return <Navigate to={`/squads/${squadId}`} replace />;
  }

  return <Outlet />;
};

export default SquadIdGuard;
