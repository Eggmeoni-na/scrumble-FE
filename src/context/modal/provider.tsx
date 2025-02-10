import { modalContext } from '@/context/modal/context';
import { breakpoints, pcMediaQuery } from '@/styles/breakpoints';
import { ModalParameters, ModalType } from '@/types';
import { css } from '@emotion/react';
import { PropsWithChildren, useCallback, useMemo, useRef, useState } from 'react';

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

const modalConatiner = css`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  max-width: ${breakpoints.mobile};

  ${pcMediaQuery(css`
    max-width: ${breakpoints.pc};
  `)}
`;
