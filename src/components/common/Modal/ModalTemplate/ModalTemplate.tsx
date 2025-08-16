import { Overlay } from '@/components/common';
import { ModalTemplate } from '@/types';
import { memo } from 'react';

const Container = memo(({ children, ...rest }: Omit<ModalTemplate, 'styleType' | 'title'>) =>
  rest.isOverlay ? (
    <Overlay onClose={rest.onClose} preventClick={rest.preventClick} transparent={rest.transparent}>
      {children}
    </Overlay>
  ) : (
    <>{children}</>
  ),
);

const ModalTemplate = ({ children, onClose, styleType = 'common', ...rest }: ModalTemplate) => (
  <Container
    onClose={onClose}
    isOverlay={rest.isOverlay}
    preventClick={rest.preventClick}
    transparent={rest.transparent}
  >
    <dialog className={`modal-container ${styleType}`}>{children}</dialog>
  </Container>
);

Container.displayName = 'Container';

export default memo(ModalTemplate);
