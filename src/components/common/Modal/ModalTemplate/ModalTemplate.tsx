import { Overlay, OverlayProps } from '@/components/common/Overlay';
import { ModalStyle } from '@/types';
import { PropsWithChildren, memo } from 'react';

export type ModalTemplate = PropsWithChildren &
  OverlayProps & {
    isOverlay: boolean;
    styleType?: ModalStyle;
  };

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
    <div
      className={`modal-container ${styleType}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="presentation"
    >
      {children}
    </div>
  </Container>
);

Container.displayName = 'Container';

export default memo(ModalTemplate);
