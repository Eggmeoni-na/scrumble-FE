import { Close } from '@/assets/icons';
import { memo } from 'react';

const ModalHeader = ({ title = '', onClose }: { title?: string; onClose?: () => void }) => (
    <header className={'modal-header'}>
      <h1>{title}</h1>
      <button onClick={onClose} className={'close'}>
        <Close />
      </button>
    </header>
  );

export default memo(ModalHeader);
