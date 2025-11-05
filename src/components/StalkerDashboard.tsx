import React from 'react';
import './StalkerDashboard.css';
import { useLanguage } from '../context/LanguageContext';

const sections = [
  { id: 'skills', translationKey: 'recruiter.section.skills' },
  { id: 'experience', translationKey: 'recruiter.section.experience' },
  { id: 'education', translationKey: 'recruiter.section.education' },
  { id: 'projects', translationKey: 'recruiter.section.projects' },
  { id: 'contact', translationKey: 'recruiter.section.contact' },
];

interface StalkerDashboardProps {
  onSelectSection: (sectionId: string) => void;
}

const StalkerDashboard: React.FC<StalkerDashboardProps> = ({ onSelectSection }) => {
  const { t } = useLanguage();
  return (
    <div className="stalkerDashboard">
      <h2 className="stalkerDashboard__title">{t('recruiter.title')}</h2>
      <div className="stalkerDashboard__grid">
        {sections.map((section) => (
          <button
            key={section.id}
            className="stalkerDashboard__card"
            type="button"
            onClick={() => onSelectSection(section.id)}
          >
            <div className="stalkerDashboard__cardContent">
              <h3>{t(section.translationKey)}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StalkerDashboard;
