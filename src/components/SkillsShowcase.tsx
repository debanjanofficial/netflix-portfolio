import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { skillGroups } from '../content/data';
import ShowcaseLayout from './ShowcaseLayout';

interface SkillsShowcaseProps { onBack: () => void; initialGroupId?: string; }

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({ onBack, initialGroupId }) => {
  const { language, t } = useLanguage();
  const [activeGroupId, setActiveGroupId] = useState(initialGroupId ?? skillGroups[0].id);

  useEffect(() => { if (initialGroupId) setActiveGroupId(initialGroupId); }, [initialGroupId]);
  const activeGroup = useMemo(
    () => skillGroups.find((group) => group.id === activeGroupId) ?? skillGroups[0],
    [activeGroupId],
  );

  return (
    <ShowcaseLayout
      eyebrow={t('skills.eyebrow')}
      title={t('skills.title')}
      description={t('skills.info')}
      onBack={onBack}
      sidebar={(
        <>
          <h2 className="showcase__sectionTitle">{t('skills.categories')}</h2>
          <div className="showcase__tabs" role="tablist">
            {skillGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={group.id === activeGroup.id}
                className={`showcase__tab ${group.id === activeGroup.id ? 'showcase__tab--active' : ''}`}
                onClick={() => setActiveGroupId(group.id)}
              >
                {group.label[language] ?? group.label.en}
              </button>
            ))}
          </div>
        </>
      )}
    >
      <h2 className="showcase__sectionTitle">{activeGroup.label[language] ?? activeGroup.label.en}</h2>
      <article className="showcase__card">
        <div className="showcase__chips">
          {(activeGroup.items[language] ?? activeGroup.items.en).map((item) => <span key={item}>{item}</span>)}
        </div>
      </article>
    </ShowcaseLayout>
  );
};

export default SkillsShowcase;
