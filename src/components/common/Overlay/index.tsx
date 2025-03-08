import { OverlayProps } from '@/types';
import { css } from '@emotion/react';
import { MouseEvent, PropsWithChildren } from 'react';

const Overlay = ({
  children,
  onClose,
  preventClick = true,
  transparent = false,
  ...rest
}: PropsWithChildren & OverlayProps) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      css={[container, transparent && bgTransparent]}
      onClick={preventClick ? undefined : handleClose}
      role="presentation"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Overlay;

const container = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0 0 0 / 50%);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const bgTransparent = css`
  background: transparent;
  backdrop-filter: blur(5px);
`;
