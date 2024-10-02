import { ComponentType } from 'react';

export type ModalStyle = 'common' | 'local' | 'alert';
export type ActionStatus = 'confirm' | 'delete';

export type ModalParameters = {
  onSubmit(value: unknown): unknown;
  onAbort(reason?: string): void;
  actionModal?: ActionModalType;
};

export type ModalType<P> = {
  element: ComponentType<P>;
  modalId: string;
  resolve: <T extends {}>(value?: T | PromiseLike<T>) => void;
  reject: (reason: string) => void;
  actionModal?: ActionModalType;
};

export type ModalContentProps<T = unknown> = {
  onSubmit: (result: T) => void;
  onAbort: (error?: string) => void;
};

export type ActionModalType = {
  type: ActionStatus;
  message: string;
  displayCancel: boolean;
};
