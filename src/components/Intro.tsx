import React, { useEffect, useRef } from 'react';
import './Intro.css';

interface IntroProps {
  onIntroComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onIntroComplete }) => {
  const playedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  

  useEffect(() => {
    // Attempt autoplay on mount
    if (!playedRef.current) {
      playedRef.current = true;
      // Try user's uploaded jingle first, then mp3, ogg, then synth fallback
      const tryPlay = async () => {
        const candidates = [
          '/nouveau-jingle-netflix.mp3',
          '/tudum.mp3',
          '/tudum.ogg',
        ];
        for (const url of candidates) {
          try {
            const a = new Audio(url);
            audioRef.current = a;
            a.volume = 0.85;
            a.muted = true;  // start muted to allow autoplay
            console.log('Intro: attempting to play', url);
            await a.play();
            a.muted = false; // unmute after playback starts
            console.log('Intro: playing', url);
            return;
          } catch (err) {
            console.log('Intro: failed to play', url, err);
          }
        }
        try {
          console.log('Intro: falling back to synthesized sound');
          synthTudum();
        } catch (e) {
          console.log('Intro: synth failed', e);
        }
      };
      tryPlay();
    }
  }, []);

  // synthesize a short "tudum"-like sound using Web Audio API
  const synthTudum = () => {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, now);

    // two short tones to mimic the "tudum" feel
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(160, now);
    osc1.connect(gain);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220, now + 0.055);
    osc2.connect(gain);

    // envelope
    gain.gain.linearRampToValueAtTime(0.9, now + 0.01);
    gain.gain.linearRampToValueAtTime(0.0, now + 0.45);

    osc1.start(now);
    osc2.start(now + 0.055);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);

    // close context after a short delay
    setTimeout(() => {
      try {
        ctx.close();
      } catch {}
    }, 700);
  };

  return (
    <div className="intro">
     <audio src="/nouveau-jingle-netflix.mp3" autoPlay preload="auto" />
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
