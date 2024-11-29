import { useSquadStore } from '@/stores';
import { PropsWithChildren } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const SquadIdGuard = ({ children }: PropsWithChildren) => {
  const { squadId } = useParams();
  const currentSquadId = useSquadStore((state) => state.currentSquadId);

  if (!currentSquadId || currentSquadId.toString() !== squadId) {
    return <Navigate to={`/squads/${squadId}`} replace />;
  }

  return <>{children}</>;
};

export default SquadIdGuard;
