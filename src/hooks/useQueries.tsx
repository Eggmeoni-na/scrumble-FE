import { getSquadApi } from '@/api/mockApi';
import { queryOptions } from '@tanstack/react-query';

export const squadKeys = {
  squad: ['squadList'] as const,
  squadById: (squadId: string) => [squadKeys.squad, squadId] as const,
};

export const squadQueryOptions = () =>
  queryOptions({
    queryKey: squadKeys.squad,
    queryFn: getSquadApi,
  });
