import React from 'react';
import './Banner.css';
import FalconLogo from './FalconLogo';
import { useLanguage } from '../context/LanguageContext';
import { bannerSummary } from '../content/data';

interface BannerProps {
  profile: string;
}

const Banner: React.FC<BannerProps> = ({ profile }) => {
  const { language, t } = useLanguage();
  // Determine if recruiter view
  const isRecruiter = profile === 'recruiter';
  if (isRecruiter) {
    // Recruiter hero with name and summary
    return (
      <section className="banner banner--recruiter">
        <video
          className="banner__video"
          src="/a-young-handsome-businessman-student-in-a-suit-comes-with-a-briefcase-at-the-s-SBV-348637057-preview.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="banner__overlay" aria-hidden="true" />
        <div className="banner__contents banner__contents--recruiter">
          <div style={{ marginBottom: '20px' }}>
            <FalconLogo size="large" />
          </div>
          <h1 className="banner__title banner__title--recruiter">Debanjan Chakraborty</h1>
          {bannerSummary[language].map((line) => (
            <p key={line} className="banner__summary">
              {line}
            </p>
          ))}
        </div>
        <div className="banner--fadeBottom" />
      </section>
    );
  }
  // Default Netflix-style hero
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1573495628361-0a2122f803f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">NÉRO THE ASSASSIN</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__button--play">{t('banner.play') || 'Play'}</button>
          <button className="banner__button banner__button--info">{t('banner.moreInfo') || 'More Info'}</button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
