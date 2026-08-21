import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { experiences } from '../content/data';
import ShowcaseLayout from './ShowcaseLayout';

interface ExperienceShowcaseProps { onBack: () => void; initialExperienceId?: string; }

const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = ({ onBack, initialExperienceId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState(initialExperienceId ?? experiences[0].id);

  useEffect(() => { if (initialExperienceId) setActiveId(initialExperienceId); }, [initialExperienceId]);
  const activeEntry = useMemo(() => experiences.find((entry) => entry.id === activeId) ?? experiences[0], [activeId]);
  const content = activeEntry.content[language] ?? activeEntry.content.en;

  return (
    <ShowcaseLayout
      eyebrow={t('experience.eyebrow')}
      title={t('experience.title')}
      description={t('experience.info')}
      onBack={onBack}
      sidebar={(
        <>
          <h2 className="showcase__sectionTitle">{t('experience.roles')}</h2>
          <div className="showcase__tabs" role="tablist">
            {experiences.map((entry) => {
              const localised = entry.content[language] ?? entry.content.en;
              return (
                <button key={entry.id} type="button" role="tab" aria-selected={entry.id === activeEntry.id}
                  className={`showcase__tab ${entry.id === activeEntry.id ? 'showcase__tab--active' : ''}`}
                  onClick={() => setActiveId(entry.id)}>
                  {localised.role}
                </button>
              );
            })}
          </div>
        </>
      )}
    >
      <h2 className="showcase__sectionTitle">{t('experience.selectedRole')}</h2>
      <article className="showcase__card">
        <div className="showcase__meta"><span>{content.company}</span><span>{content.duration}</span></div>
        <h2>{content.role}</h2>
        <p className="showcase__subtle">{content.location}</p>
        <ul className="showcase__list">{content.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      </article>
    </ShowcaseLayout>
  );
};

export default ExperienceShowcase;
