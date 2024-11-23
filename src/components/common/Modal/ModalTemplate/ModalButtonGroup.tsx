import { PropsWithChildren, memo } from 'react';

const ModalButtonGroup = ({ children }: PropsWithChildren) => <div className="modal-btn-group">{children}</div>;

export default memo(ModalButtonGroup);
