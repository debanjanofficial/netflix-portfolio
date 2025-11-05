import React, { useEffect, useMemo, useRef, useState } from 'react';
import './ExperienceShowcase.css';
import { useLanguage } from '../context/LanguageContext';
import { experiences } from '../content/data';
interface ExperienceShowcaseProps {
  onBack: () => void;
  initialExperienceId?: string;
}

const ExperienceShowcase: React.FC<ExperienceShowcaseProps> = ({ onBack, initialExperienceId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>(initialExperienceId ?? experiences[0].id);
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
    if (initialExperienceId) {
      setActiveId(initialExperienceId);
    }
  }, [initialExperienceId]);

  const activeExperience = useMemo(() => {
    return experiences.find((exp) => exp.id === activeId) ?? experiences[0];
  }, [activeId]);

  const experienceContent = activeExperience.content[language] ?? activeExperience.content.en;

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
            <h1 className="experience__title">{t('experience.title') || 'Experience'}</h1>
            <div className="experience__infoWrapper">
              <button
                type="button"
                className="experience__infoButton"
                aria-describedby="experience-info-tooltip"
              >
                i
              </button>
              <div className="experience__tooltip" role="tooltip" id="experience-info-tooltip">
                {t('experience.info')}
              </div>
            </div>
          </div>
        </div>
        <div className="experience__panel">
          <div className="experience__tabs" role="tablist">
            {experiences.map((exp) => {
              const content = exp.content[language] ?? exp.content.en;
              return (
                <button
                  key={exp.id}
                  type="button"
                  className={`experience__tab ${exp.id === activeExperience.id ? 'experience__tab--active' : ''}`}
                  onClick={() => setActiveId(exp.id)}
                  role="tab"
                  aria-selected={exp.id === activeExperience.id}
                >
                  {content.role}
                </button>
              );
            })}
          </div>
          <div className="experience__details" role="tabpanel">
            <div className="experience__meta">
              <h2 className="experience__role">{experienceContent.role}</h2>
              <span className="experience__company">{experienceContent.company}</span>
              <span className="experience__duration">{experienceContent.duration}</span>
            </div>
            <ul className="experience__bullets">
              {experienceContent.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {reportOpen && (
        <div className="experience__modalBackdrop" role="dialog" aria-modal="true">
          <div className="experience__modal">
            <h2 className="experience__modalTitle">{t('report.title')}</h2>
            <label className="experience__modalLabel" htmlFor="experience-report-input">
              {t('report.label')}
            </label>
            <textarea
              id="experience-report-input"
              className="experience__textarea"
              placeholder={t('report.placeholder')}
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setReportStatus('idle');
              }}
            />
            {reportStatus === 'error' && (
              <p className="experience__modalMessage experience__modalMessage--error">{t('report.error')}</p>
            )}
            {reportStatus === 'sent' && (
              <p className="experience__modalMessage experience__modalMessage--success">{t('report.success')}</p>
            )}
            <div className="experience__modalActions">
              <button
                type="button"
                className="experience__modalButton experience__modalButton--secondary"
                onClick={closeReport}
              >
                {t('report.cancel')}
              </button>
              <button
                type="button"
                className="experience__modalButton experience__modalButton--primary"
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

export default ExperienceShowcase;
