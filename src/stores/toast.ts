import { Status } from '@/types';
import { create } from 'zustand';

export type Toast = {
  id: string;
  message: string;
  type: Status;
  disabled?: boolean;
};

type ToastState = {
  toasts: Toast[];
  createToast: (toast: Omit<Toast, 'id' | 'onRemove'>) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  createToast: ({ message, type, disabled }) => {
    const toastId = Date.now().toString();
    set((state) => ({
      toasts: [...state.toasts, { id: toastId, message, type, disabled }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== toastId),
      }));
    }, 3000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
