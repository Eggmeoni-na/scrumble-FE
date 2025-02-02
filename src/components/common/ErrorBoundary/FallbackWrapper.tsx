import { ModalFallback } from '@/components/common/ErrorBoundary';
import { Loading } from '@/components/common/Loading';
import { MainLayout } from '@/components/layouts';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const FallbackWrapper = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ModalFallback} onReset={reset}>
      <Suspense fallback={<Loading />}>
        <MainLayout>{children}</MainLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default FallbackWrapper;
