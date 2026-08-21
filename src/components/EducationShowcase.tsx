import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { educationEntries } from '../content/data';
import ShowcaseLayout from './ShowcaseLayout';

interface EducationShowcaseProps { onBack: () => void; initialEducationId?: string; }

const EducationShowcase: React.FC<EducationShowcaseProps> = ({ onBack, initialEducationId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState(initialEducationId ?? educationEntries[0].id);

  useEffect(() => { if (initialEducationId) setActiveId(initialEducationId); }, [initialEducationId]);
  const activeEntry = useMemo(() => educationEntries.find((entry) => entry.id === activeId) ?? educationEntries[0], [activeId]);
  const content = activeEntry.content[language] ?? activeEntry.content.en;

  return (
    <ShowcaseLayout
      eyebrow={t('education.eyebrow')}
      title={t('education.title')}
      description={t('education.info')}
      onBack={onBack}
      sidebar={(
        <>
          <h2 className="showcase__sectionTitle">{t('education.degrees')}</h2>
          <div className="showcase__tabs" role="tablist">
            {educationEntries.map((entry) => {
              const localised = entry.content[language] ?? entry.content.en;
              return (
                <button key={entry.id} type="button" role="tab" aria-selected={entry.id === activeEntry.id}
                  className={`showcase__tab ${entry.id === activeEntry.id ? 'showcase__tab--active' : ''}`}
                  onClick={() => setActiveId(entry.id)}>
                  {localised.degree}
                </button>
              );
            })}
          </div>
        </>
      )}
    >
      <h2 className="showcase__sectionTitle">{t('education.academicRecord')}</h2>
      <article className="showcase__card">
        <div className="showcase__meta"><span>{content.location}</span><span>{content.duration}</span></div>
        <h2>{content.degree}</h2>
        <a className="showcase__link" href={content.institutionUrl} target="_blank" rel="noopener noreferrer">{content.institution}</a>
        <p className="showcase__label">{t('education.thesis')}</p>
        <h3>{content.thesisTitle}</h3>
        <p className="showcase__subtle">{t('education.supervisors')}: {content.supervisors}</p>
        <ul className="showcase__list">{content.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      </article>
    </ShowcaseLayout>
  );
};

export default EducationShowcase;
