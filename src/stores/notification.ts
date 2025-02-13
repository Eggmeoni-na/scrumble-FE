import { create } from 'zustand';

type NotificationState = {
  hasUnread: boolean;
  setHasUnread: (value: boolean) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  hasUnread: false,
  setHasUnread: (value: boolean) => set({ hasUnread: value }),
}));
