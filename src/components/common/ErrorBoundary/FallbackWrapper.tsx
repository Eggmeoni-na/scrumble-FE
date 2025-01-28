import { ModalFallback } from '@/components/common/ErrorBoundary';
import { Loading } from '@/components/common/Loading';
import { MainLayout } from '@/components/layouts';
import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const FallbackWrapper = ({ children }: PropsWithChildren) => (
  <ErrorBoundary FallbackComponent={ModalFallback}>
    <Suspense fallback={<Loading />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  </ErrorBoundary>
);

export default FallbackWrapper;
