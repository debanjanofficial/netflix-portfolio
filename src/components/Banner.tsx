import React from 'react';
import './Banner.css';

interface BannerProps {
  profile: string;
}

const Banner: React.FC<BannerProps> = ({ profile }) => {
  // Determine if recruiter view
  const isRecruiter = profile === 'recruiter';
  if (isRecruiter) {
    // Recruiter hero with name and summary
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1573495628361-0a2122f803f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">Debanjan Chakraborty</h1>
          <p className="banner__summary">
            Data Science MSc graduate with a focus on extracting actionable insights from complex datasets to drive strategic decision-making. Experienced in leveraging advanced analytics, machine learning, and data visualization to solve business challenges and optimize operations. Eager to apply analytical skills to support business growth and innovation in a dynamic corporate environment.
          </p>
        </div>
      </header>
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
          <button className="banner__button banner__button--play">Play</button>
          <button className="banner__button banner__button--info">More Info</button>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
