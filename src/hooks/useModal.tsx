import { Modal, ModalPortal } from '@/components/common/Modal';
import { ActionModalType } from '@/types';
import { ComponentType, useCallback, useEffect, useId } from 'react';
import { useModalContext } from 'src/context/ModalContext';

export const useModal = () => {
  const context = useModalContext();
  const { modals, open, close, portalRef } = context;
  const modalId = useId();

  const closeModal = useCallback(() => close(modalId), [modalId, close]);
  const openModal = useCallback(
    <P extends { onSubmit(value: unknown): unknown }>(
      Component: ComponentType<P>,
      props?: Record<string, unknown>,
      actionModal?: ActionModalType,
    ) =>
      new Promise<{ ok: boolean; value?: Parameters<P['onSubmit']>[0]; error?: string }>((resolve) => {
        const modal = {
          element: Component,
          props,
          modalId,
          resolve: <T extends {}>(value?: T) => {
            resolve({ ok: true, value });
            closeModal();
          },
          reject: (reason?: string) => {
            resolve({ ok: false, error: reason });
            closeModal();
          },
          actionModal: actionModal && {
            type: actionModal.type,
            text: actionModal.text,
            message: actionModal.message,
            displayCancel: actionModal.displayCancel,
          },
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
