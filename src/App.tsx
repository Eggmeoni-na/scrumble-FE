import { ToastContainer } from '@/components/common/Toast';
import { useThemeStore } from '@/stores/theme';
import { darkTheme, globalStyles, lightTheme } from '@/styles';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <Global styles={globalStyles} />
        <Outlet />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
