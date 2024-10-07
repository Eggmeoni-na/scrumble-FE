import { Status } from '@/types';
import { create } from 'zustand';

export type Toast = {
  id: string;
  message: string;
  type: Status;
  showCloseButton?: boolean;
  duration?: number;
};

type ToastState = {
  toasts: Toast[];
  createToast: (toast: Omit<Toast, 'id' | 'onRemove'>) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  createToast: ({ message, type, showCloseButton = true, duration = 3000 }) => {
    const toastId = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id: toastId, message, type, showCloseButton }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
