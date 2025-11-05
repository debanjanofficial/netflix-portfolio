import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ProjectsShowcase.css';
import { useLanguage } from '../context/LanguageContext';
import { projectEntries } from '../content/data';

interface ProjectsShowcaseProps {
  onBack: () => void;
  initialProjectId?: string;
}

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onBack, initialProjectId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>(initialProjectId ?? projectEntries[0].id);
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

  useEffect(() => {
    if (initialProjectId) {
      setActiveId(initialProjectId);
    }
  }, [initialProjectId]);

  const activeProjectEntry = useMemo(() => {
    return projectEntries.find((project) => project.id === activeId) ?? projectEntries[0];
  }, [activeId]);

  const projectContent = activeProjectEntry.content[language] ?? activeProjectEntry.content.en;

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
    <section className="projects">
      <video
        ref={videoRef}
        className="projects__video"
        src="/projects.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={() => {
          videoRef.current?.pause();
        }}
      />
      <div className="projects__overlay" aria-hidden="true" />
      <div className="projects__topBar">
        <button
          type="button"
          className="projects__iconButton"
          aria-label="Go back to dashboard"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="projects__iconButton"
          aria-label="Report an issue"
          onClick={openReport}
        >
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M5 3v18h2v-7h7l1.5 3H21L17 9l4-6h-8l-1.5 3H7V3H5z" />
          </svg>
        </button>
      </div>
      <div className="projects__content">
        <div className="projects__heading">
          <div className="projects__titleRow">
            <h1 className="projects__title">{t('projects.title') || 'Projects'}</h1>
            <div className="projects__infoWrapper">
              <button
                type="button"
                className="projects__infoButton"
                aria-describedby="projects-info-tooltip"
              >
                i
              </button>
              <div className="projects__tooltip" role="tooltip" id="projects-info-tooltip">
                {t('projects.info')}
              </div>
            </div>
          </div>
        </div>
        <div className="projects__panel">
          <div className="projects__tabs" role="tablist">
            {projectEntries.map((project) => {
              const content = project.content[language] ?? project.content.en;
              return (
                <button
                  key={project.id}
                  type="button"
                  className={`projects__tab ${project.id === activeProjectEntry.id ? 'projects__tab--active' : ''}`}
                  onClick={() => setActiveId(project.id)}
                  role="tab"
                  aria-selected={project.id === activeProjectEntry.id}
                >
                  {content.title}
                </button>
              );
            })}
          </div>
          <div className="projects__details" role="tabpanel">
            <div className="projects__meta">
              <h2 className="projects__projectTitle">
                <a
                  href={projectContent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__projectLink"
                >
                  {projectContent.title}
                </a>
              </h2>
              <p className="projects__summary">{projectContent.summary}</p>
            </div>
            <div className="projects__techList">
              {projectContent.tech.map((item) => (
                <span key={item} className="projects__techChip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {reportOpen && (
        <div className="projects__modalBackdrop" role="dialog" aria-modal="true">
          <div className="projects__modal">
            <h2 className="projects__modalTitle">{t('report.title')}</h2>
            <label className="projects__modalLabel" htmlFor="projects-report-input">
              {t('report.label')}
            </label>
            <textarea
              id="projects-report-input"
              className="projects__textarea"
              placeholder={t('report.placeholder')}
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setReportStatus('idle');
              }}
            />
            {reportStatus === 'error' && (
              <p className="projects__modalMessage projects__modalMessage--error">{t('report.error')}</p>
            )}
            {reportStatus === 'sent' && (
              <p className="projects__modalMessage projects__modalMessage--success">{t('report.success')}</p>
            )}
            <div className="projects__modalActions">
              <button
                type="button"
                className="projects__modalButton projects__modalButton--secondary"
                onClick={closeReport}
              >
                {t('report.cancel')}
              </button>
              <button
                type="button"
                className="projects__modalButton projects__modalButton--primary"
                onClick={submitReport}
              >
                {t('report.send')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
