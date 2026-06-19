import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './css/boot.css';
import './css/window.css';
import './css/dock.css';
import './css/terminal.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
