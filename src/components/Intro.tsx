import React from 'react';
import './Intro.css';

interface IntroProps {
  onIntroComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onIntroComplete }) => {
  return (
    <div className="intro">
      <div
        className="intro__logo"
        onAnimationEnd={() => onIntroComplete()}
      >
        <h1>Debanjan Chakraborty</h1>
      </div>
    </div>
  );
};

export default Intro;
