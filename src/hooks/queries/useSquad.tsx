import { getSquadDetail, getSquadList } from '@/apis';
import { queryOptions } from '@tanstack/react-query';

export const squadKeys = {
  squad: ['squadList'] as const,
  squadDetail: (squadId: number) => [...squadKeys.squad, squadId] as const,
};

export const squadQueryOptions = () =>
  queryOptions({
    queryKey: squadKeys.squad,
    queryFn: getSquadList,
  });

export const squadDetailQueryOptions = (squadId: number) =>
  queryOptions({
    queryKey: squadKeys.squadDetail(squadId),
    queryFn: () => getSquadDetail(squadId),
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
