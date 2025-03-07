import { TodoQueryParamsContext } from '@/context/todo/context';
import { TodoQueryParams } from '@/types';
import { PropsWithChildren } from 'react';

type Props = {
  queryParams: TodoQueryParams;
} & PropsWithChildren;

export const TodoProvider = ({ children, queryParams }: Props) => (
  <TodoQueryParamsContext.Provider value={queryParams}>{children}</TodoQueryParamsContext.Provider>
);
