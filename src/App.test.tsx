import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { translations } from './i18n/translations';

test('renders the portfolio profile selector', () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  render(
    <LanguageProvider translations={translations}>
      <App />
    </LanguageProvider>,
  );

  expect(screen.getByLabelText('Debanjan Chakraborty portfolio introduction')).toBeInTheDocument();
  fireEvent.animationEnd(screen.getByText('Debanjan'));

  expect(screen.queryByLabelText('Debanjan Chakraborty portfolio introduction')).not.toBeInTheDocument();
  expect(window.sessionStorage.getItem('portfolioIntroSeen')).toBe('true');
  expect(screen.getByText(/choose a profile/i)).toBeInTheDocument();
  expect(screen.getByText('Recruiter')).toBeInTheDocument();
  expect(screen.getByText('Visitor')).toBeInTheDocument();
});

const dashboardSections = [
  { button: 'Skills', heading: 'Skills' },
  { button: 'Experience', heading: 'Experience' },
  { button: 'Education', heading: 'Education' },
  { button: 'Research & Publications', heading: 'Research & Publications' },
  { button: 'Projects', heading: 'Projects' },
];

test.each(['Recruiter', 'Visitor'])('returns from every section to the %s dashboard', (profileName) => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.scrollTo = jest.fn();
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: jest.fn(),
  });

  const { unmount } = render(
    <LanguageProvider translations={translations}><App /></LanguageProvider>,
  );

  fireEvent.animationEnd(screen.getByText('Debanjan'));
  fireEvent.click(screen.getByText(profileName));

  dashboardSections.forEach(({ button, heading }) => {
    fireEvent.click(screen.getByRole('button', { name: button }));
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go back to dashboard' }));
    expect(screen.getByRole('button', { name: button })).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' });
  });

  unmount();
});

test('offers every language and opens the localized help centre', () => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  window.scrollTo = jest.fn();
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });

  render(<LanguageProvider translations={translations}><App /></LanguageProvider>);
  fireEvent.animationEnd(screen.getByText('Debanjan'));
  fireEvent.click(screen.getByText('Recruiter'));

  fireEvent.click(screen.getByRole('button', { name: 'Language' }));
  expect(screen.getAllByRole('menuitemradio')).toHaveLength(13);
  fireEvent.click(screen.getByRole('menuitemradio', { name: 'Português' }));
  expect(screen.getByRole('button', { name: 'Início' })).toBeInTheDocument();
  expect(screen.getByText(/Mestre em Ciência de Dados e investigador em IA aplicada/)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Projetos' }));
  expect(screen.getAllByText('SENSATION: Sistema de navegação para deficientes visuais').length).toBeGreaterThan(0);
  expect(screen.getByText(/segmentação semântica DeepLabv3\+ ResNet50/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Voltar ao painel' }));

  const profileMenu = screen.getByText('Recrutador').closest('[role="button"]');
  expect(profileMenu).not.toBeNull();
  fireEvent.click(profileMenu as HTMLElement);
  fireEvent.click(screen.getByRole('button', { name: 'Centro de ajuda' }));
  expect(screen.getByRole('heading', { name: 'Centro de ajuda', level: 1 })).toBeInTheDocument();
  expect(screen.getByText('Acessibilidade')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /Voltar ao portefólio/ }));
  expect(screen.getByRole('button', { name: 'Início' })).toBeInTheDocument();
});
