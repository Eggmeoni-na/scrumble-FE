import { useThemeStore } from '@/stores/theme';
import { globalStyles } from '@/styles';
import { Global, ThemeProvider } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const { theme, toggleTheme } = useThemeStore((state) => state);

  return (
    <ThemeProvider theme={theme}>
      <button onClick={toggleTheme}>임시 테마 변경 버튼</button>
      <Global styles={globalStyles} />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
