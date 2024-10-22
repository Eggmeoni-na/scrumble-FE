import { QueryClient } from '@tanstack/react-query';

export const optimisticUpdateMutateHandler = async <T>(
  queryClient: QueryClient,
  queryKeys: readonly unknown[],
  updateFn: (prevData: T) => void,
) => {
  try {
    await queryClient.cancelQueries({
      queryKey: queryKeys,
    });

    const oldData = queryClient.getQueryData<T>(queryKeys) ?? [];

    queryClient.setQueryData(queryKeys, (prevData: T) => updateFn(prevData));

    return oldData;
  } catch (error) {
    console.error('Optimistic Update Error:', error);
  }
};
