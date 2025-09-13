import { css } from '@emotion/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Loading } from '@/components/common';
import { ModalFallback } from '@/components/common/ErrorBoundary';
import { MainLayout } from '@/components/layouts';

const FallbackWrapper = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ModalFallback} onReset={reset}>
      <Suspense fallback={<Loading />}>
        <div css={wrapperStyle}>
          <MainLayout>{children}</MainLayout>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default FallbackWrapper;

const wrapperStyle = css`
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;
