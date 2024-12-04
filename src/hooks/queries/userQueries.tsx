import { getUser } from '@/apis';
import { queryOptions } from '@tanstack/react-query';

export const userQueries = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: getUser,
  });
