import React from 'react';
import './RecruiterDashboard.css';

const sections = [
  'Skills',
  'Experience',
  'Certifications',
  'Recommendations',
  'Projects',
  'Contact Me',
];

interface RecruiterDashboardProps {
  onSelectSection: (section: string) => void;
}

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onSelectSection }) => {
  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Today&apos;s Top Pick for You</h2>
      <div className="dashboard__grid">
        {sections.map((title) => (
          <button
            key={title}
            className="dashboard__card"
            type="button"
            onClick={() => onSelectSection(title)}
          >
            <div className="dashboard__cardContent">
              <h3>{title}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
