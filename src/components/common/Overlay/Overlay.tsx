import { css } from '@emotion/react';
import { HTMLAttributes, PropsWithChildren } from 'react';

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
  return (
    <div
      css={[container, transparent && bgTransparent]}
      onClick={preventClick ? undefined : onClose}
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
`;

const bgTransparent = css`
  background: transparent;
  backdrop-filter: blur(5px);
`;
