import { TodoQueryParamsContext } from '@/context/todo/context';
import { useContext } from 'react';

export const useTodoQueryParamsContext = () => {
  const context = useContext(TodoQueryParamsContext);
  if (!context) throw new Error('TodoQueryParamsContext is not available.');
  return context;
};
