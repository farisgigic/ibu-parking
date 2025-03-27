import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';  
import '@styles/App.css';
import Navigator from '@components/Navigator';

function App() {
  return (
    <BrowserRouter>  
      <Navigator />
    </BrowserRouter>
  );
}

export default App;
