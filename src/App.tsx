import RootErrorFallback from '@/components/common/ErrorBoundary/RootErrorFallback';
import { ToastContainer } from '@/components/common/Toast';
import { ModalProvider } from '@/context/ModalContext';
import { useThemeStore } from '@/stores';
import { darkTheme, globalStyles, lightTheme } from '@/styles';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Global styles={globalStyles} />
          <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={reset}>
            <Outlet />
          </ErrorBoundary>
          <ToastContainer />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
