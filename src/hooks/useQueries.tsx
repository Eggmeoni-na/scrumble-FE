import { getSquadList } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const squadKeys = {
  squad: ['squadList'] as const,
  squadById: (squadId: string) => [squadKeys.squad, squadId] as const,
};

export const squadQueryOptions = () =>
  queryOptions({
    queryKey: squadKeys.squad,
    queryFn: getSquadList,
  });
