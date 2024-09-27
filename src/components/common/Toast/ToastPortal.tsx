import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const ToastPortal = ({ children }: PropsWithChildren) => {
  const toastRoot = document.getElementById('toast-container');
  return createPortal(children, toastRoot!);
};

export default ToastPortal;
