import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { publications, researchInterests } from '../content/data';
import ShowcaseLayout from './ShowcaseLayout';

interface ResearchShowcaseProps { onBack: () => void; initialPublicationId?: string; }

const ResearchShowcase: React.FC<ResearchShowcaseProps> = ({ onBack, initialPublicationId }) => {
  const { language, t } = useLanguage();

  return (
    <ShowcaseLayout
      eyebrow={t('research.eyebrow')}
      title={t('research.title')}
      description={t('research.info')}
      onBack={onBack}
      sidebar={(
        <>
          <h2 className="showcase__sectionTitle">{t('research.interests')}</h2>
          <div className="showcase__chips">{researchInterests[language].map((interest) => <span key={interest}>{interest}</span>)}</div>
        </>
      )}
    >
      <h2 className="showcase__sectionTitle">{t('research.publications')}</h2>
      {publications.map((publication) => {
        const content = publication.content[language] ?? publication.content.en;
        return (
          <article key={publication.id} className={`showcase__card ${publication.id === initialPublicationId ? 'showcase__card--focused' : ''}`}>
            <div className="showcase__meta"><span>{content.citation}</span><span>{content.status}</span></div>
            <h3>{content.title}</h3>
            <p className="showcase__subtle"><em>{content.venue}</em></p>
          </article>
        );
      })}
    </ShowcaseLayout>
  );
};

export default ResearchShowcase;
