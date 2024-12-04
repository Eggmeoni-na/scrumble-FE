import { DefaultHeader, SquadHeader } from '@/components/common';
import { useLocation, useParams } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { squadId } = useParams();

  if (location.pathname.includes(`/squads/${squadId}`) && squadId) {
    return <SquadHeader squadId={Number(squadId)} />;
  }

  return <DefaultHeader />;
};

export default Header;
