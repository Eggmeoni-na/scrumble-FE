import { TODO_STATUS } from '@/constants/todo';

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
