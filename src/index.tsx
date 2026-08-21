import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LanguageProvider } from './context/LanguageContext';
import { translations } from './i18n/translations';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <LanguageProvider translations={translations}>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);

reportWebVitals();
