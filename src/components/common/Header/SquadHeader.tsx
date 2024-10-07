import { HeaderTemplate } from '@/components/common/Header';
import { squadByIdQueryOptions } from '@/hooks/useQueries';
import { useSuspenseQuery } from '@tanstack/react-query';

const SquadHeader = ({ squadId }: { squadId: string }) => {
  const { data } = useSuspenseQuery(squadByIdQueryOptions(Number(squadId))).data;

  return (
    <HeaderTemplate>
      <HeaderTemplate.BackButton />
      <span>{data.squadName}</span>
      <HeaderTemplate.RightMenu>
        <HeaderTemplate.ToggleTheme />
        <HeaderTemplate.AlarmButton />
        <HeaderTemplate.MenuButton />
      </HeaderTemplate.RightMenu>
    </HeaderTemplate>
  );
};

export default SquadHeader;
