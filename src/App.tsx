import { ToastContainer } from '@/components/common/Toast';
import { ModalProvider } from '@/context/ModalContext';
import { useThemeStore } from '@/stores/theme';
import { darkTheme, globalStyles, lightTheme } from '@/styles';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <ModalProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <Global styles={globalStyles} />
          <Outlet />
          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default App;
