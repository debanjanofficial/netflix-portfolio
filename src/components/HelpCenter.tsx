import React from 'react';
import './HelpCenter.css';
import { useLanguage } from '../context/LanguageContext';
import { personalDetails } from '../content/data';

interface HelpCenterProps { onBack: () => void; }

const helpTopics = [
  { id: 'profiles', icon: '◉' },
  { id: 'navigation', icon: '↗' },
  { id: 'search', icon: '⌕' },
  { id: 'languages', icon: '文' },
  { id: 'cv', icon: '↓' },
  { id: 'accessibility', icon: 'A' },
  { id: 'troubleshooting', icon: '↻' },
];

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack }) => {
  const { t } = useLanguage();

  return (
    <section className="help">
      <div className="help__backdrop" aria-hidden="true" />
      <button type="button" className="help__back" onClick={onBack}>← {t('help.back')}</button>
      <div className="help__content">
        <header className="help__header">
          <p>{t('help.eyebrow')}</p>
          <h1>{t('help.title')}</h1>
          <span>{t('help.intro')}</span>
        </header>
        <div className="help__grid">
          {helpTopics.map((topic) => (
            <article className="help__topic" key={topic.id}>
              <span className="help__icon" aria-hidden="true">{topic.icon}</span>
              <div>
                <h2>{t(`help.${topic.id}.title`)}</h2>
                <p>{t(`help.${topic.id}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="help__contact">
          <div>
            <h2>{t('help.contact.title')}</h2>
            <p>{t('help.contact.body')}</p>
          </div>
          <a href={personalDetails.emailUrl}>{t('help.contact.action')}</a>
        </aside>
      </div>
    </section>
  );
};

export default HelpCenter;
