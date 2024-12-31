import { StatusError } from '@/utils';

export function assert(condition: boolean, statusCode: number, message?: string): asserts condition {
  if (!condition) {
    throw new StatusError(statusCode, message);
  }
}
