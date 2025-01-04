import { modalContext } from '@/context/modal/context';
import { useContext } from 'react';

export const useModalContext = () => {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error('modalContext is not available.');
  }
  return context;
};
