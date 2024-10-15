import { TODO_STATUS, TODO_TYPES } from '@/constants/todo';

export type ToDo = {
  toDoAt: string;
  toDoDetails: ToDoDetail;
};

export type ToDoDetail = {
  toDoId: number;
  squadId: number;
  squadName: string;
  contents: string;
  todoAt: string;
  todoStatus: TodoStatus;
};

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export type GetTodoRequest = {
  squadId: number;
  memberId: number;
  queryParams: {
    startDate: string;
    endDate: string;
    lastToDoId: number;
    pageSize: number;
  };
};

export type TodoTypes = (typeof TODO_TYPES)[keyof typeof TODO_TYPES];

export type PostTodoRequest = {
  toDoType: TodoTypes;
  contents: string;
  todoAt: string;
};
