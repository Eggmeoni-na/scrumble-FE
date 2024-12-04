import { getSquadList } from '@/apis';
import { getSquadDetailApi } from '@/apis/mockApi';
import { queryOptions } from '@tanstack/react-query';

export const squadKeys = {
  squad: ['squadList'] as const,
  squadDetail: (squadId: number) => [...squadKeys.squad, squadId] as const,
};

export const squadQueryOptions = () =>
  queryOptions({
    queryKey: squadKeys.squad,
    queryFn: getSquadList,
    refetchOnWindowFocus: false,
  });

export const squadDetailQueryOptions = (squadId: number) =>
  queryOptions({
    queryKey: squadKeys.squadDetail(squadId),
    queryFn: () => getSquadDetailApi(squadId),
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
