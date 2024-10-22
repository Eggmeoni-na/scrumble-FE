export type InfiniteQueryData<T> = {
  pages: T[]; // 각 페이지의 데이터 배열
  pageParams: unknown[]; // 각 페이지에 대한 파라미터
};
