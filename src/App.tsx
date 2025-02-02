import { Loading, RootErrorFallback, ToastContainer } from '@/components/common';
import { ModalProvider } from '@/context/modal';
import { NotificationProvider } from '@/context/notification/provider';
import { useThemeStore } from '@/stores';
import { darkTheme, globalStyles, lightTheme } from '@/styles';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
  },
});

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Global styles={globalStyles} />
            <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
            <ToastContainer />
          </ThemeProvider>
        </NotificationProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
