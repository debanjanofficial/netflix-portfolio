import React from 'react';
import './Banner.css';

interface BannerProps {
  profile: string;
}

const Banner: React.FC<BannerProps> = ({ profile }) => {
  // Always display hero banner with title and buttons
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
          <button className="banner__button banner__button--play">Play</button>
          <button className="banner__button banner__button--info">More Info</button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
