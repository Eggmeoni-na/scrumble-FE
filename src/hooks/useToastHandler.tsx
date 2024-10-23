import { useToastStore } from '@/stores';

type Param = (message: string) => void;

const useToastHandler = () => {
  const createToast = useToastStore((state) => state.createToast);
  const successToast: Param = (message) =>
    createToast({
      type: 'success',
      message,
      duration: 2000,
      showCloseButton: false,
    });

  const failedToast: Param = (message) =>
    createToast({
      type: 'failed',
      message,
      duration: 2000,
      showCloseButton: false,
    });

  const warningToast: Param = (message) =>
    createToast({
      type: 'warning',
      message,
      duration: 2000,
      showCloseButton: false,
    });

  return { successToast, failedToast, warningToast };
};

export default useToastHandler;
