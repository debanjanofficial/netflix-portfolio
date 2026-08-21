import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectEntries } from '../content/data';
import ShowcaseLayout from './ShowcaseLayout';

interface ProjectsShowcaseProps { onBack: () => void; initialProjectId?: string; }

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onBack, initialProjectId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState(initialProjectId ?? projectEntries[0].id);

  useEffect(() => { if (initialProjectId) setActiveId(initialProjectId); }, [initialProjectId]);
  const activeEntry = useMemo(() => projectEntries.find((entry) => entry.id === activeId) ?? projectEntries[0], [activeId]);
  const content = activeEntry.content[language] ?? activeEntry.content.en;

  return (
    <ShowcaseLayout
      eyebrow={t('projects.eyebrow')}
      title={t('projects.title')}
      description={t('projects.info')}
      onBack={onBack}
      sidebar={(
        <>
          <h2 className="showcase__sectionTitle">{t('projects.selectedWork')}</h2>
          <div className="showcase__tabs" role="tablist">
            {projectEntries.map((entry) => {
              const localised = entry.content[language] ?? entry.content.en;
              return (
                <button key={entry.id} type="button" role="tab" aria-selected={entry.id === activeEntry.id}
                  className={`showcase__tab ${entry.id === activeEntry.id ? 'showcase__tab--active' : ''}`}
                  onClick={() => setActiveId(entry.id)}>
                  {localised.title}
                </button>
              );
            })}
          </div>
        </>
      )}
    >
      <h2 className="showcase__sectionTitle">{t('projects.projectDetails')}</h2>
      <article className="showcase__card">
        <div className="showcase__meta"><span>{content.context}</span></div>
        <h2>
          {content.url ? <a className="showcase__link" href={content.url} target="_blank" rel="noopener noreferrer">{content.title}</a> : content.title}
        </h2>
        <ul className="showcase__list">{content.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        <div className="showcase__chips showcase__chips--spaced">{content.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
      </article>
    </ShowcaseLayout>
  );
};

export default ProjectsShowcase;
