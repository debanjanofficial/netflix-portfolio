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

const RecruiterDashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Your Next Watch</h2>
      <div className="dashboard__grid">
        {sections.map((title) => (
          <div key={title} className="dashboard__card">
            <div className="dashboard__cardContent">
              <h3>{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
