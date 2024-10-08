import { HeaderTemplate } from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { squadDetailQueryOptions } from '@/hooks/queries/useSquad';

import useSidebar from '@/hooks/useSidebar';
import { useSuspenseQuery } from '@tanstack/react-query';

const SquadHeader = ({ squadId }: { squadId: string }) => {
  const { data } = useSuspenseQuery(squadDetailQueryOptions(Number(squadId))).data;
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div>
      <HeaderTemplate>
        <HeaderTemplate.BackButton />
        <span>{data.squadName}</span>
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
