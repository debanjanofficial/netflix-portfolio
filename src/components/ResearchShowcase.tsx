import React from 'react';
import './ResearchShowcase.css';
import { useLanguage } from '../context/LanguageContext';
import { publications, researchInterests } from '../content/data';

interface ResearchShowcaseProps {
  onBack: () => void;
  initialPublicationId?: string;
}

const ResearchShowcase: React.FC<ResearchShowcaseProps> = ({ onBack, initialPublicationId }) => {
  const { language, t } = useLanguage();

  return (
    <section className="research">
      <div className="research__backdrop" aria-hidden="true" />
      <button type="button" className="research__back" onClick={onBack} aria-label={t('common.back')}>
        <span aria-hidden="true">←</span>
      </button>
      <div className="research__content">
        <header className="research__header">
          <p className="research__eyebrow">{t('research.eyebrow')}</p>
          <h1>{t('research.title')}</h1>
          <p>{t('research.info')}</p>
        </header>

        <div className="research__layout">
          <section className="research__interests" aria-labelledby="research-interests-title">
            <h2 id="research-interests-title">{t('research.interests')}</h2>
            <div className="research__chips">
              {researchInterests[language].map((interest) => <span key={interest}>{interest}</span>)}
            </div>
          </section>

          <section className="research__publications" aria-labelledby="research-publications-title">
            <h2 id="research-publications-title">{t('research.publications')}</h2>
            <div className="research__publicationList">
              {publications.map((publication) => {
                const content = publication.content[language] ?? publication.content.en;
                return (
                  <article
                    key={publication.id}
                    className={`research__publication ${publication.id === initialPublicationId ? 'research__publication--focused' : ''}`}
                  >
                    <div className="research__publicationMeta">
                      <span>{content.citation}</span>
                      <span>{content.status}</span>
                    </div>
                    <h3>{content.title}</h3>
                    <p>{content.venue}</p>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ResearchShowcase;
