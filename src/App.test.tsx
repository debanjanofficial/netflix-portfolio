import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

test.each(['Recruiter', 'Visitor'])('returns from Projects to the %s dashboard', (profileName) => {
  window.localStorage.clear();
  window.scrollTo = jest.fn();
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: jest.fn(),
  });

  render(
    <LanguageProvider translations={translations}>
      <App />
    </LanguageProvider>,
  );

  fireEvent.click(screen.getByText(profileName));
  fireEvent.click(screen.getByRole('button', { name: 'Projects' }));
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Go back to dashboard' }));
  expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' });
});
