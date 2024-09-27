export * from './auth';
export * from './squad';

export type ResponseType<T> = {
  data: T;
  message: string;
  statusCodeValue: number;
};

export type Status = 'success' | 'warning' | 'failed';
