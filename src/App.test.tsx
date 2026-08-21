import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { translations } from './i18n/translations';

test('renders the portfolio profile selector', () => {
  window.localStorage.clear();
  render(
    <LanguageProvider translations={translations}>
      <App />
    </LanguageProvider>,
  );

  expect(screen.getByText(/choose a profile/i)).toBeInTheDocument();
  expect(screen.getByText('Recruiter')).toBeInTheDocument();
  expect(screen.getByText('Visitor')).toBeInTheDocument();
});
