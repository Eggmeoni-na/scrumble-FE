import { TodoQueryParams } from '@/types';
import { createContext } from 'react';

export const TodoQueryParamsContext = createContext<TodoQueryParams | null>(null);
