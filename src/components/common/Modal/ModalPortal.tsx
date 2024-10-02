import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
  portalContainer: HTMLDivElement | null;
};

const ModalPortal = ({ children, portalContainer }: Props) => {
  return createPortal(children, portalContainer!);
};

export default ModalPortal;
