import { DefaultHeader, SquadHeader } from '@/components/common/Header';
import { useLocation, useParams } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const { squadId } = useParams();

  if (location.pathname.includes(`/squads/${squadId}`)) {
    return <SquadHeader squadId={squadId ?? '0'} />;
  }

  return <DefaultHeader />;
};

export default Header;
