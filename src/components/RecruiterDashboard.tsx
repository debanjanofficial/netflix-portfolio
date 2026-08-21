import React from 'react';
import './RecruiterDashboard.css';
import { useLanguage } from '../context/LanguageContext';

const sections = [
  { id: 'skills', translationKey: 'recruiter.section.skills' },
  { id: 'experience', translationKey: 'recruiter.section.experience' },
  { id: 'education', translationKey: 'recruiter.section.education' },
  { id: 'research', translationKey: 'recruiter.section.research' },
  { id: 'projects', translationKey: 'recruiter.section.projects' },
  { id: 'contact', translationKey: 'recruiter.section.contact' },
];

interface RecruiterDashboardProps {
  onSelectSection: (sectionId: string) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onSelectSection }) => {
  const { t } = useLanguage();
  return (
    <div className="dashboard">
      <h2 className="dashboard__title">{t('recruiter.title')}</h2>
      <div className="dashboard__grid">
        {sections.map((section) => (
          <button
            key={section.id}
            className="dashboard__card"
            type="button"
            onClick={() => onSelectSection(section.id)}
          >
            <div className="dashboard__cardContent">
              <h3>{t(section.translationKey)}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
