import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/neo-forms.css';
import './styles/neo-chrome.css';
import './styles/neo-status.css';
import './styles/neo-chips.css';
import './index.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
