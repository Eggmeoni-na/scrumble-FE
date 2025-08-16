import { buttonStyle } from '@/components/common/Button/style';
import {
  buttonGroupStyle,
  eggIconStyle,
  errorMessageStyle,
  fallbackWrapperStyle,
  homeButton,
} from '@/components/common/ErrorBoundary/RootErrorFallback/style';
import { useUserCookie } from '@/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

type Props = {
  statusCode: number;
  message: string;
  reset: VoidFunction;
};

const GeneralErrorFallback = ({ statusCode, message, reset }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearCookie } = useUserCookie();

  const resetErrorAndRedirect = async () => {
    reset();
    queryClient.resetQueries();
    if (statusCode === 401) {
      clearCookie();
      navigate('/login', { replace: true });
      return;
    }
  };

  const resetErrorAndGoHome = () => {
    reset();
    navigate('/');
  };

  return (
    <div css={fallbackWrapperStyle}>
      <div css={eggIconStyle}>🐣</div>
      <p css={errorMessageStyle}>{message}</p>
      <div css={buttonGroupStyle}>
        {statusCode !== 401 && (
          <button css={[buttonStyle, homeButton]} onClick={resetErrorAndGoHome}>
            홈으로
          </button>
        )}
        <button css={buttonStyle} onClick={resetErrorAndRedirect}>
          {statusCode === 401 ? '로그인' : '새로고침'}
        </button>
      </div>
    </div>
  );
};

const RootErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const statusCode = error.response?.status;
  const responseMessage = error.response?.data.message || '예상치 못한 에러가 발생했어요.\n잠시 후 다시 시도해주세요';
  const message = statusCode === 401 ? '로그인이 필요해요' : responseMessage;

  return <GeneralErrorFallback statusCode={statusCode} message={message} reset={resetErrorBoundary} />;
};

export default RootErrorFallback;
