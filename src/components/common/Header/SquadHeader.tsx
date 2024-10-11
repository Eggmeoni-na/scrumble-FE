import { HeaderTemplate } from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';

import useSidebar from '@/hooks/useSidebar';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const SquadHeader = ({ squadId }: { squadId: string }) => {
  const { data } = useSuspenseQuery(squadDetailQueryOptions(Number(squadId))).data;
  const { isOpen, toggleSidebar } = useSidebar();
  const { state } = useLocation();

  const title = state && state.assignStep ? '리더 변경' : data.squadName;

  return (
    <div>
      <HeaderTemplate>
        <HeaderTemplate.BackButton />
        <span>{title}</span>
        <HeaderTemplate.RightMenuWrapper>
          <HeaderTemplate.ToggleThemeButton />
          <HeaderTemplate.AlarmButton />
          <HeaderTemplate.SidebarToggleButton toggleSidebar={toggleSidebar} />
        </HeaderTemplate.RightMenuWrapper>
      </HeaderTemplate>
      {isOpen && <Sidebar closeSidebar={toggleSidebar} />}
    </div>
  );
};

export default SquadHeader;
