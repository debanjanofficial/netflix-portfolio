import React from 'react';
import './VisitorDashboard.css';
import { useLanguage } from '../context/LanguageContext';

const sections = [
  { id: 'skills', translationKey: 'recruiter.section.skills' },
  { id: 'experience', translationKey: 'recruiter.section.experience' },
  { id: 'education', translationKey: 'recruiter.section.education' },
  { id: 'research', translationKey: 'recruiter.section.research' },
  { id: 'projects', translationKey: 'recruiter.section.projects' },
  { id: 'contact', translationKey: 'recruiter.section.contact' },
];

interface VisitorDashboardProps {
  onSelectSection: (sectionId: string) => void;
}

const VisitorDashboard: React.FC<VisitorDashboardProps> = ({ onSelectSection }) => {
  const { t } = useLanguage();
  return (
    <div className="visitorDashboard">
      <h2 className="visitorDashboard__title">{t('recruiter.title')}</h2>
      <div className="visitorDashboard__grid">
        {sections.map((section) => (
          <button
            key={section.id}
            className="visitorDashboard__card"
            type="button"
            onClick={() => onSelectSection(section.id)}
          >
            <div className="visitorDashboard__cardContent">
              <h3>{t(section.translationKey)}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisitorDashboard;
