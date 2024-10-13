export * from './auth';
export * from './modal';
export * from './squad';
export * from './todo';

export type ApiResponse<T> = {
  data: T;
  message: string;
  statusCodeValue: number;
};

export type ApiErrorResponse = {
  data: null;
  message: string;
  statusCodeValue: number;
};

export type Status = 'success' | 'warning' | 'failed';
