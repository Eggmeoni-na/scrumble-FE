import { breakpoints, mobileMediaQuery, pcMediaQuery } from '@/styles/breakpoints';
import { ModalParameters, ModalType } from '@/types';
import { css } from '@emotion/react';
import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

type ModalContextValue<P> = {
  open: (modal: ModalType<P>) => void;
  close: (id: string) => void;
  modals: ModalType<P>[];
  portalRef: MutableRefObject<HTMLDivElement | null>;
};

const modalContext = createContext<ModalContextValue<any> | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ModalType<ModalParameters>[]>([]);
  const portalRef = useRef<HTMLDivElement | null>(null);

  const open = useCallback((modal: ModalType<ModalParameters>) => setModals((prev) => [...prev, modal]), []);
  const close = useCallback((id: string) => setModals((prev) => prev.filter((v) => v.modalId !== id)), []);

  const value = useMemo(
    () => ({
      open,
      close,
      modals,
      portalRef,
    }),
    [modals, open, close],
  );

  return (
    <modalContext.Provider value={value}>
      <div css={modalConatiner} ref={portalRef}>
        {children}
      </div>
    </modalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error('modalContext is not available.');
  }
  return context;
};

const modalConatiner = css`
  position: relative;
  margin: 0 auto;
  overflow: hidden;

  ${mobileMediaQuery(css`
    max-width: ${breakpoints.mobile};
  `)}

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}
`;
