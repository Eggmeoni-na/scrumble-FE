import { HeaderTemplate } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { useOpenToggle } from '@/hooks';
import { squadDetailQueryOptions } from '@/hooks/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

const HEADER_TITLE: Record<string, string> = {
  assign: '리더 변경',
  invite: '멤버 초대',
};

const SquadHeader = ({ squadId }: { squadId: number }) => {
  const { data } = useSuspenseQuery(squadDetailQueryOptions(squadId)).data;
  const { isOpen, toggleOpen } = useOpenToggle();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const step = params.get('step');

  const title = step ? HEADER_TITLE[step] : data.squadName;

  return (
    <>
      <HeaderTemplate>
        <HeaderTemplate.BackButton />
        <span>{title}</span>
        <HeaderTemplate.RightMenuWrapper>
          <HeaderTemplate.ToggleThemeButton />
          <HeaderTemplate.NotificationsButton />
          <HeaderTemplate.SidebarToggleButton toggleSidebar={toggleOpen} />
        </HeaderTemplate.RightMenuWrapper>
      </HeaderTemplate>
      {isOpen && <Sidebar closeSidebar={toggleOpen} />}
    </>
  );
};

export default SquadHeader;
