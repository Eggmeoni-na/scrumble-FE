import { Close, Failed, Success, Warning } from '@/assets/icons';
import { IconWrapper } from '@/components';
import {
  closeButton,
  getStatusStyles,
  messageWrapper,
  toastContainerStyle,
  toastStyle,
} from '@/components/common/Toast/style';
import ToastPortal from '@/components/common/Toast/ToastPortal';
import { Toast, useToastStore } from '@/stores';

const toastType = {
  success: <Success />,
  warning: <Warning />,
  failed: <Failed />,
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore((state) => state);
  return (
    <ToastPortal>
      <div css={toastContainerStyle}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            showCloseButton={toast.showCloseButton}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastPortal>
  );
};

export default ToastContainer;

const Toast = ({ message, type, onRemove, showCloseButton }: Omit<Toast, 'id'> & { onRemove: VoidFunction }) => (
  <div css={[toastStyle, [getStatusStyles(type)]]}>
    <div css={messageWrapper}>
      {toastType[type]}
      <p>{message}</p>
    </div>
    <IconWrapper
      customStyle={() => closeButton(showCloseButton)}
      onClick={onRemove}
      aria-label="토스트 닫기"
      role="button"
    >
      <Close />
    </IconWrapper>
  </div>
);
