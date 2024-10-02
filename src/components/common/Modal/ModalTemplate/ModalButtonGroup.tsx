import { PropsWithChildren, memo } from 'react';

const ModalButtonGroup = ({ children }: PropsWithChildren) => {
  return <div className="modal-btn-group">{children}</div>;
};

export default memo(ModalButtonGroup);
