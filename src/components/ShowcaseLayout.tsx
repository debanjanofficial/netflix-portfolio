import React from 'react';
import './ShowcaseLayout.css';
import { useLanguage } from '../context/LanguageContext';

interface ShowcaseLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  onBack: () => void;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const ShowcaseLayout: React.FC<ShowcaseLayoutProps> = ({
  eyebrow,
  title,
  description,
  onBack,
  sidebar,
  children,
}) => {
  const { t } = useLanguage();

  return (
    <section className="showcase">
      <div className="showcase__backdrop" aria-hidden="true" />
      <button type="button" className="showcase__back" onClick={onBack} aria-label={t('common.back')}>
        <span aria-hidden="true">←</span>
      </button>
      <div className="showcase__content">
        <header className="showcase__header">
          <p className="showcase__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="showcase__layout">
          <aside className="showcase__sidebar">{sidebar}</aside>
          <main className="showcase__main">{children}</main>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseLayout;
