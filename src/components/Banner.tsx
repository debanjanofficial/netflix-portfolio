
import React from 'react';
import './Banner.css';

interface BannerProps {
  profile: string;
}

const Banner: React.FC<BannerProps> = ({ profile }) => {
  const isRecruiter = profile === 'recruiter';

  return (
    <header
      className="banner"
      style={{
        backgroundImage: isRecruiter
          ? `url("https://images.unsplash.com/photo-1555066931-4365d1469c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`
          : `url("https://images.unsplash.com/photo-1555066931-4365d1469c98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
      }}
    >
      {isRecruiter ? (
        <div className="banner__contents">
          <video className="banner__video" autoPlay loop muted>
            <source src="https://assets.mixkit.co/videos/preview/mixkit-man-in-a-suit-walking-in-a-busy-street-4343-large.mp4" type="video/mp4" />
          </video>
          <div className="banner__buttons">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="banner__button">
              Resume
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="banner__button">
              LinkedIn
            </a>
          </div>
        </div>
      ) : (
        <div className="banner__contents">
          <h1 className="banner__title">Debanjan Chakrborty</h1>
          <div className="banner__buttons">
            <button className="banner__button">My Work</button>
            <button className="banner__button">Contact Me</button>
          </div>
          <h1 className="banner__description">
            Full Stack Developer | React | Node.js | TypeScript
          </h1>
        </div>
      )}
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
