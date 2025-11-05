import React, { useEffect, useMemo, useRef, useState } from 'react';
import './EducationShowcase.css';
import { useLanguage } from '../context/LanguageContext';
import { educationEntries } from '../content/data';

interface EducationShowcaseProps {
  onBack: () => void;
  initialEducationId?: string;
}

const EducationShowcase: React.FC<EducationShowcaseProps> = ({ onBack, initialEducationId }) => {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState<string>(initialEducationId ?? educationEntries[0].id);
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
    if (initialEducationId) {
      setActiveId(initialEducationId);
    }
  }, [initialEducationId]);

  const activeEducationEntry = useMemo(() => {
    return educationEntries.find((item) => item.id === activeId) ?? educationEntries[0];
  }, [activeId]);

  const content = activeEducationEntry.content[language] ?? activeEducationEntry.content.en;

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
    <section className="education">
      <video
        ref={videoRef}
        className="education__video"
        src="/education.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={() => {
          videoRef.current?.pause();
        }}
      />
      <div className="education__overlay" aria-hidden="true" />
      <div className="education__topBar">
        <button
          type="button"
          className="education__iconButton"
          aria-label="Go back to dashboard"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="education__iconButton"
          aria-label="Report an issue"
          onClick={openReport}
        >
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M5 3v18h2v-7h7l1.5 3H21L17 9l4-6h-8l-1.5 3H7V3H5z" />
          </svg>
        </button>
      </div>
      <div className="education__content">
        <div className="education__heading">
          <div className="education__titleRow">
            <h1 className="education__title">{t('education.title') || 'Education'}</h1>
            <div className="education__infoWrapper">
              <button
                type="button"
                className="education__infoButton"
                aria-describedby="education-info-tooltip"
              >
                i
              </button>
              <div className="education__tooltip" role="tooltip" id="education-info-tooltip">
                {t('education.info')}
              </div>
            </div>
          </div>
        </div>
        <div className="education__panel">
          <div className="education__tabs" role="tablist">
            {educationEntries.map((item) => {
              const localised = item.content[language] ?? item.content.en;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`education__tab ${item.id === activeEducationEntry.id ? 'education__tab--active' : ''}`}
                  onClick={() => setActiveId(item.id)}
                  role="tab"
                  aria-selected={item.id === activeEducationEntry.id}
                >
                  {localised.degree}
                </button>
              );
            })}
          </div>
          <div className="education__details" role="tabpanel">
            <div className="education__meta">
              <h2 className="education__degree">{content.degree}</h2>
              <a
                className="education__institution"
                href={content.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.institution}
              </a>
              <span className="education__major">{content.major}</span>
            </div>
            <div className="education__section">
              <h3>{t('education.courses')}</h3>
              <ul className="education__courses">
                {content.courses.map((course) => (
                  <li key={course} className="education__course">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
            <div className="education__section">
              <h3>{content.thesisTitle}</h3>
              <p className="education__thesisDescription">{content.thesisDescription}</p>
            </div>
          </div>
        </div>
      </div>
      {reportOpen && (
        <div className="education__modalBackdrop" role="dialog" aria-modal="true">
          <div className="education__modal">
            <h2 className="education__modalTitle">{t('report.title')}</h2>
            <label className="education__modalLabel" htmlFor="education-report-input">
              {t('report.label')}
            </label>
            <textarea
              id="education-report-input"
              className="education__textarea"
              placeholder={t('report.placeholder')}
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setReportStatus('idle');
              }}
            />
            {reportStatus === 'error' && (
              <p className="education__modalMessage education__modalMessage--error">
                {t('report.error')}
              </p>
            )}
            {reportStatus === 'sent' && (
              <p className="education__modalMessage education__modalMessage--success">
                {t('report.success')}
              </p>
            )}
            <div className="education__modalActions">
              <button
                type="button"
                className="education__modalButton education__modalButton--secondary"
                onClick={closeReport}
              >
                {t('report.cancel')}
              </button>
              <button
                type="button"
                className="education__modalButton education__modalButton--primary"
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

export default EducationShowcase;
