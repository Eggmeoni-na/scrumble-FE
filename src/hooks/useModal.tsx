import { Modal, ModalPortal } from '@/components/common/Modal';
import { useModalContext } from '@/context/modal';
import { ActionModalType } from '@/types';
import { ComponentType, useCallback, useEffect, useId } from 'react';

export type OpenModalType = <
  P extends {
    onSubmit(value: unknown): unknown;
  },
>(
  Component: ComponentType<P>,
  props?: Omit<P, 'onSubmit' | 'onAbort'> | null,
  actionModal?: ActionModalType | null,
) => Promise<{
  ok: boolean;
  value?: Parameters<P['onSubmit']>[0];
  error?: string;
}>;

export const useModal = () => {
  const context = useModalContext();
  const { modals, open, close, portalRef } = context;
  const modalId = useId();

  const closeModal = useCallback(() => close(modalId), [modalId, close]);
  const openModal: OpenModalType = useCallback(
    (Component, props = null, actionModal = null) =>
      new Promise((resolve) => {
        const modal = {
          element: Component,
          props,
          modalId,
          resolve: <T extends object>(value?: T) => {
            resolve({ ok: true, value });
            closeModal();
          },
          reject: (reason?: string) => {
            resolve({ ok: false, error: reason });
            closeModal();
          },
          actionModal: actionModal,
        };
        open(modal);
      }),
    [modalId, open, closeModal],
  );

  const ModalContainer = useCallback(() => {
    const modal = modals.find((modal) => modal.modalId === modalId);
    return modal ? (
      <ModalPortal portalContainer={portalRef.current}>
        <Modal modal={modal} />
      </ModalPortal>
    ) : (
      <></>
    );
  }, [modals, modalId, portalRef]);

  useEffect(() => closeModal, [closeModal]);
  return { openModal, closeModal, ModalContainer };
};
