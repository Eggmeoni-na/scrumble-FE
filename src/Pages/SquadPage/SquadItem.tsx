import { itemStyle } from '@/Pages/SquadPage/style';
import { fullSizeButtonStyle } from '@/styles/globalStyles';
import { Squad } from '@/types';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const SquadItem = ({ squad }: { squad: Squad }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    startTransition(() => {
      navigate(`/squads/${squad.squadId}`);
    });
  };

  return (
    <li css={itemStyle}>
      <button onClick={handleNavigation} style={fullSizeButtonStyle} aria-label={`${squad.squadName} 스쿼드 선택`}>
        {squad.squadName}
      </button>
    </li>
  );
};

export default SquadItem;
