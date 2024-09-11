import { globalStyles } from '@/styles/globalStyles';
import { Global } from '@emotion/react';
import './App.css';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
    </>
  );
}

export default App;
