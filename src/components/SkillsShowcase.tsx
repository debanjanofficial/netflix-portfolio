import React, { useEffect, useMemo, useRef, useState } from 'react';
import './SkillsShowcase.css';
import { useLanguage } from '../context/LanguageContext';
import { skillGroups } from '../content/data';
interface SkillsShowcaseProps {
  onBack: () => void;
  initialGroupId?: string;
}

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({ onBack, initialGroupId }) => {
  const { language, t } = useLanguage();
  const [activeGroupId, setActiveGroupId] = useState<string>(initialGroupId ?? skillGroups[0].id);
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
    if (initialGroupId) {
      setActiveGroupId(initialGroupId);
    }
  }, [initialGroupId]);

  const activeGroup = useMemo(() => {
    return skillGroups.find((group) => group.id === activeGroupId) ?? skillGroups[0];
  }, [activeGroupId]);

  const activeItems = activeGroup.items[language] ?? activeGroup.items.en;

  const handleOpenReport = () => {
    setReportText('');
    setReportStatus('idle');
    setReportOpen(true);
  };

  const handleCloseReport = () => {
    setReportOpen(false);
    setReportText('');
    setReportStatus('idle');
  };

  const handleReportSubmit = () => {
    if (!reportText.trim()) {
      setReportStatus('error');
      return;
    }
    setReportStatus('sent');
    setTimeout(() => {
      handleCloseReport();
    }, 1500);
  };

  return (
    <section className="skills">
      <video
        ref={videoRef}
        className="skills__video"
        src="/skills.mp4"
        autoPlay
        muted
        playsInline
        preload="metadata"
        onEnded={() => {
          videoRef.current?.pause();
        }}
      />
      <div className="skills__overlay" aria-hidden="true" />
      <div className="skills__topBar">
        <button
          type="button"
          className="skills__iconButton"
          aria-label="Go back to dashboard"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="skills__iconButton"
          aria-label="Report an issue"
          onClick={handleOpenReport}
        >
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M5 3v18h2v-7h7l1.5 3H21L17 9l4-6h-8l-1.5 3H7V3H5z" />
          </svg>
        </button>
      </div>
      <div className="skills__content">
        <div className="skills__heading">
          <div className="skills__titleRow">
            <h1 className="skills__title">{t('skills.title') || 'Skills'}</h1>
            <div className="skills__infoWrapper">
              <button
                type="button"
                className="skills__infoButton"
                aria-describedby="skills-info-tooltip"
              >
                i
              </button>
              <div className="skills__tooltip" role="tooltip" id="skills-info-tooltip">
                {t('skills.info')}
              </div>
            </div>
          </div>
        </div>
        <div className="skills__panel">
          <div className="skills__tabs" role="tablist">
            {skillGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className={`skills__tab ${group.id === activeGroup.id ? 'skills__tab--active' : ''}`}
                onClick={() => setActiveGroupId(group.id)}
                role="tab"
                aria-selected={group.id === activeGroup.id}
              >
                {group.label[language] ?? group.label.en}
              </button>
            ))}
          </div>
          <div className="skills__listWrap" role="tabpanel">
            <ul className="skills__list">
              {activeItems.map((item) => (
                <li key={item} className="skills__listItem">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {reportOpen && (
        <div className="skills__modalBackdrop" role="dialog" aria-modal="true">
          <div className="skills__modal">
            <h2 className="skills__modalTitle">{t('report.title')}</h2>
            <label className="skills__modalLabel" htmlFor="skills-report-input">
              {t('report.label')}
            </label>
            <textarea
              id="skills-report-input"
              className="skills__textarea"
              placeholder={t('report.placeholder')}
              value={reportText}
              onChange={(event) => {
                setReportText(event.target.value);
                setReportStatus('idle');
              }}
            />
            {reportStatus === 'error' && (
              <p className="skills__modalMessage skills__modalMessage--error">{t('report.error')}</p>
            )}
            {reportStatus === 'sent' && (
              <p className="skills__modalMessage skills__modalMessage--success">{t('report.success')}</p>
            )}
            <div className="skills__modalActions">
              <button
                type="button"
                className="skills__modalButton skills__modalButton--secondary"
                onClick={handleCloseReport}
              >
                {t('report.cancel')}
              </button>
              <button
                type="button"
                className="skills__modalButton skills__modalButton--primary"
                onClick={handleReportSubmit}
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

export default SkillsShowcase;
