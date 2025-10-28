import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ExperienceShowcase.css';

interface ExperienceShowcaseProps {
  onBack: () => void;
}

interface ExperienceDetail {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}

const EXPERIENCES: ExperienceDetail[] = [
  {
    id: 'data-scientist',
    role: 'Data Scientist',
    company: 'Siemens Energy',
    duration: '10.2025 – Present',
    bullets: [
      'Driving data-driven decision making across energy initiatives with advanced analytics and AI.',
      'Experimenting with LLMs and predictive models to optimize operational efficiency.',
      'Partnering with product stakeholders to align solutions with business goals.',
    ],
  },
  {
    id: 'db-management',
    role: 'Database Management & Data Analysis',
    company: 'Siemens Energy',
    duration: '12.2024 – 09.2025',
    bullets: [
      'Managed MS SQL databases, synchronizing SharePoint and Excel sources via Power Automate.',
      'Leveraged Alteryx for data manipulation, analysis, and preprocessing across R&D portfolios.',
      'Built Tableau dashboards and reports to surface processed insights for leadership.',
      'Collaborated with users and stakeholders to refine requirements and validate solutions.',
      'Created and maintained collaborative databases to support digital use cases.',
    ],
  },
  {
    id: 'intern-analyst',
    role: 'Intern Data Analyst',
    company: 'IT Grow Division Limited',
    duration: '10.2021 – 03.2022',
    bullets: [
      'Federated data into Power BI from MySQL and Excel, applying Power Query transformations.',
      'Delivered cross-functional dashboards for finance, sales, marketing, supply chain, and executives.',
      'Adopted project chartering, stakeholder mapping, and Kanban practices to streamline delivery.',
    ],
  },
];

const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = ({ onBack }) => {
  const [activeId, setActiveId] = useState<string>(EXPERIENCES[0].id);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const node = videoRef.current;
    if (!node) {
      return;
    }

    node.currentTime = 0;
    const playPromise = node.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay might be blocked; ignore to avoid console noise.
      });
    }
  }, []);

  const activeExperience = useMemo(
    () => EXPERIENCES.find((exp) => exp.id === activeId) ?? EXPERIENCES[0],
    [activeId],
  );

  const openReport = () => {
    setReportText('');
    setReportStatus('idle');
    setReportOpen(true);
  };

  const closeReport = () => {
    setReportOpen(false);
    setReportText('');
    setReportStatus('idle');
  };

  const submitReport = () => {
    if (!reportText.trim()) {
      setReportStatus('error');
      return;
    }
    setReportStatus('sent');
    setTimeout(() => {
      closeReport();
    }, 1500);
  };

  return (
    <section className="experience">
      <video
        ref={videoRef}
        className="experience__video"
        src="/experience.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={() => {
          videoRef.current?.pause();
        }}
      />
      <div className="experience__overlay" aria-hidden="true" />
      <div className="experience__topBar">
        <button
          type="button"
          className="experience__iconButton"
          aria-label="Go back to dashboard"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="experience__iconButton"
          aria-label="Report an issue"
          onClick={openReport}
        >
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M5 3v18h2v-7h7l1.5 3H21L17 9l4-6h-8l-1.5 3H7V3H5z" />
          </svg>
        </button>
      </div>
      <div className="experience__content">
        <div className="experience__heading">
          <div className="experience__titleRow">
            <h1 className="experience__title">Experience</h1>
          </div>
        </div>
        <div className="experience__panel">
          <div className="experience__tabs" role="tablist">
            {EXPERIENCES.map((exp) => (
              <button
                key={exp.id}
                type="button"
                className={`experience__tab ${exp.id === activeExperience.id ? 'experience__tab--active' : ''}`}
                onClick={() => setActiveId(exp.id)}
                role="tab"
                aria-selected={exp.id === activeExperience.id}
              >
                {exp.role}
              </button>
            ))}
          </div>
          <div className="experience__details" role="tabpanel">
            <div className="experience__meta">
              <h2 className="experience__role">{activeExperience.role}</h2>
              <span className="experience__company">{activeExperience.company}</span>
              <span className="experience__duration">{activeExperience.duration}</span>
            </div>
            <ul className="experience__bullets">
              {activeExperience.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {reportOpen && (
        <div className="experience__modalBackdrop" role="dialog" aria-modal="true">
          <div className="experience__modal">
            <h2 className="experience__modalTitle">Report an Issue</h2>
            <label className="experience__modalLabel" htmlFor="experience-report-input">
              What is the issue?
            </label>
            <textarea
              id="experience-report-input"
              className="experience__textarea"
              placeholder="Describe the problem you encountered..."
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setReportStatus('idle');
              }}
            />
            {reportStatus === 'error' && (
              <p className="experience__modalMessage experience__modalMessage--error">
                Please describe the issue before sending.
              </p>
            )}
            {reportStatus === 'sent' && (
              <p className="experience__modalMessage experience__modalMessage--success">Issue sent.</p>
            )}
            <div className="experience__modalActions">
              <button
                type="button"
                className="experience__modalButton experience__modalButton--secondary"
                onClick={closeReport}
              >
                Cancel
              </button>
              <button
                type="button"
                className="experience__modalButton experience__modalButton--primary"
                onClick={submitReport}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExperienceShowcase;
