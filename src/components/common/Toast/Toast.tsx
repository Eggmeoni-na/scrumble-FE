import { Close, Failed, Success, Warning } from '@/assets/icons';
import IconWrapper from '@/components/common/IconWrapper';
import ToastPortal from '@/components/common/Toast/ToastPortal';
import { Toast, useToastStore } from '@/stores/toast';
import { Status } from '@/types';
import { css } from '@emotion/react';

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
            disabled={toast.disabled}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastPortal>
  );
};

export default ToastContainer;

const Toast = ({ message, type, onRemove, disabled }: Omit<Toast, 'id'> & { onRemove: VoidFunction }) => (
  <div css={[toastStyle, [getStatusStyles(type)]]}>
    <div css={messageWrapper}>
      <span>{toastType[type]}</span>
      <span>{message}</span>
    </div>
    <IconWrapper customStyle={() => closeButton(disabled)} onClick={onRemove} aria-label="Close toast" role="button">
      <Close />
    </IconWrapper>
  </div>
);

const toastContainerStyle = css`
  position: fixed;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  top: 20px;
  left: 50%;
  transform: translate(-50%);
`;

const toastStyle = css`
  width: 280px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 12px;
  border-radius: 8px;
  transition: opacity 0.3s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  & button {
    display: flex;
    align-items: center;
    padding: 0;
  }
`;

const messageWrapper = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const closeButton = (disabled?: boolean) => css`
  display: flex;
  align-items: center;
  visibility: ${disabled ? 'hidden' : 'visible'};

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const getStatusStyles = (status: Status) => {
  switch (status) {
    case 'success':
      return css`
        background-color: var(--color-success);
        color: white;
      `;
    case 'warning':
      return css`
        background-color: var(--color-warning);
        color: black;
      `;
    case 'failed':
      return css`
        background-color: var(--color-failed);
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: black;
      `;
  }
};
