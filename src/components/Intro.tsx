import React, { useEffect, useRef } from 'react';
import './Intro.css';

interface IntroProps {
  onIntroComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onIntroComplete }) => {
  const playedRef = useRef(false);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!playedRef.current && audioElRef.current) {
      playedRef.current = true;
      const el = audioElRef.current;
      // start muted to satisfy autoplay policies
      el.muted = true;
      el.volume = 0.85;
      el.play()
        .then(() => {
          // unmute after playback starts
          el.muted = false;
          console.log('Intro: jingle playing');
        })
        .catch((err) => {
          console.log('Intro: play error', err);
          // Web Audio API fallback for Chrome autoplay restrictions
          const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioCtx) {
            const ctx = new AudioCtx();
            fetch('/nouveau-jingle-netflix.mp3')
              .then(res => res.arrayBuffer())
              .then(data => ctx.decodeAudioData(data))
              .then(buffer => {
                const source = ctx.createBufferSource();
                source.buffer = buffer;
                source.connect(ctx.destination);
                source.start();
                console.log('Intro: played via Web Audio API fallback');
              })
              .catch(e => console.log('Intro: Web Audio fallback failed', e));
          }
        });
    }
  }, []);

  // If jingle fails, you could fallback to synthesized sound here

    // handler to unmute and set volume once autoplay begins
    const handleAudioPlay = () => {
      if (audioElRef.current) {
        audioElRef.current.muted = false;
        audioElRef.current.volume = 0.85;
        console.log('Intro: audio element unmuted');
      }
    };
  return (
    <div className="intro">
      <audio
        ref={audioElRef}
        src="/nouveau-jingle-netflix.mp3"
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
      />
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
