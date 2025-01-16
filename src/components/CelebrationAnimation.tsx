import React from 'react';
import confetti from 'canvas-confetti';

interface CelebrationAnimationProps {
  onComplete?: () => void;
}

const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({ onComplete }) => {
  React.useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      } else if (onComplete) {
        onComplete();
      }
    };

    frame();
  }, [onComplete]);

  return null;
};

export default CelebrationAnimation;