import { startTransition } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

const AuthErrorFallback = ({ reset }: { reset: VoidFunction }) => {
  const handleClick = () => {
    startTransition(() => {
      reset();
      window.location.replace('/login');
    });
  };

  return (
    <div>
      <h1>로그인이 필요해요</h1>
      <button onClick={handleClick}>로그인</button>
    </div>
  );
};

const GeneralErrorFallback = ({ message, reset }: { message: string; reset: VoidFunction }) => {
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>{message}</p>
      <button onClick={reset}>새로고침</button>
    </div>
  );
};

const RootErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const statusCode = error.response?.status;
  const navigate = useNavigate();

  const handleReset = () => {
    startTransition(() => {
      resetErrorBoundary();
      navigate(-1);
    });
  };

  return statusCode === 401 ? (
    <AuthErrorFallback reset={resetErrorBoundary} />
  ) : (
    <GeneralErrorFallback message={error.message} reset={handleReset} />
  );
};

export default RootErrorFallback;
