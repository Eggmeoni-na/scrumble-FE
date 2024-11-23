import { ComponentType } from 'react';

export type ModalStyle = 'common' | 'local' | 'alert';
export type ActionStatus = 'confirm' | 'delete';

export type ModalParameters = {
  onSubmit(value: unknown): unknown;
  onAbort(reason?: string): void;
  props?: Record<string, unknown>;
  actionModal?: ActionModalType;
};

export type ModalType<P> = {
  element: ComponentType<P>;
  props?: Record<string, unknown>;
  modalId: string;
  resolve: <T extends object>(value?: T | PromiseLike<T>) => void;
  reject: (reason: string) => void;
  actionModal?: ActionModalType;
};

export type ModalContentProps<T = unknown> = {
  onSubmit: (result: T) => void;
  onAbort: (error?: string) => void;
};

export type ActionModalType = {
  type: ActionStatus;
  text: string;
  message: string;
  displayCancel: boolean;
};

export type ActionModalContentProps<T = unknown> = {
  actionModal: ActionModalType;
} & ModalContentProps<T>;
