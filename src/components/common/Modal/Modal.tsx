import { ModalParameters, ModalType } from '@/types';
import { memo } from 'react';

const Modal = ({ modal }: { modal: ModalType<ModalParameters> }) => {
  const { element: ModalContainer, resolve, reject, actionModal, props } = modal;

  return <ModalContainer onSubmit={resolve} onAbort={reject} actionModal={actionModal} {...props} />;
};

export default memo(Modal);
