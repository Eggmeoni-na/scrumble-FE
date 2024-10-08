import { css } from '@emotion/react';
import { HTMLAttributes, MouseEvent, PropsWithChildren } from 'react';

export type OverlayProps = {
  onClose?: () => void;
  preventClick?: boolean;
  transparent?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Overlay = ({
  children,
  onClose,
  preventClick = true,
  transparent = false,
  ...rest
}: PropsWithChildren & OverlayProps) => {
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose && onClose();
  };

  return (
    <div
      css={[container, transparent && bgTransparent]}
      onClick={preventClick ? undefined : handleClose}
      onKeyDown={() => {}}
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
