import { ModalType } from '@/types';
import { createContext, MutableRefObject } from 'react';

type ModalContextValue<P> = {
  open: (modal: ModalType<P>) => void;
  close: (id: string) => void;
  modals: ModalType<P>[];
  portalRef: MutableRefObject<HTMLDivElement | null>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalContext = createContext<ModalContextValue<any> | null>(null);
