import React, { useCallback, useEffect, useRef } from 'react';
import './Intro.css';

interface IntroProps {
  onIntroComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onIntroComplete }) => {
  const completedRef = useRef(false);
  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onIntroComplete();
  }, [onIntroComplete]);

  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timeout = window.setTimeout(complete, reducedMotion ? 150 : 3800);
    return () => window.clearTimeout(timeout);
  }, [complete]);

  return (
    <div className="intro" aria-label="Debanjan Chakraborty portfolio introduction">
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__logo" onAnimationEnd={complete}>
        <span className="intro__overline">Portfolio of</span>
        <h1>Debanjan</h1>
        <span className="intro__surname">Chakraborty</span>
      </div>
    </div>
  );
};

export default Intro;
