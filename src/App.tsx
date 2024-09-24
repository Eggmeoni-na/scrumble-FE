import { useThemeStore } from '@/stores/theme';
import { globalStyles } from '@/styles';
import { darkTheme, lightTheme } from '@/styles/theme';
import { Global, ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Global styles={globalStyles} />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
