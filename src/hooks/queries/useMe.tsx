import { getUser } from '@/apis';
import { queryOptions } from '@tanstack/react-query';

export const useMe = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: getUser,
  });
