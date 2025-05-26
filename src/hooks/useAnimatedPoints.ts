import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useSound from 'use-sound';

export const useAnimatedPoints = (initialPoints: number = 0) => {
  const [points, setPoints] = useState(initialPoints);
  const controls = useAnimation();
  const [playEarnPoints] = useSound('/sounds/earn-points.mp3');
  const [playReachMilestone] = useSound('/sounds/milestone.mp3');

  const animatePoints = async (newPoints: number) => {
    const difference = newPoints - points;
    if (difference <= 0) return;

    playEarnPoints();
    
    // Animate point counter
    const duration = Math.min(2, Math.max(0.5, difference / 100));
    let current = points;
    
    while (current < newPoints) {
      current += 1;
      setPoints(current);
      await new Promise(resolve => setTimeout(resolve, duration * 1000 / (newPoints - points)));
    }

    // Check for milestones
    if (Math.floor(newPoints / 1000) > Math.floor(points / 1000)) {
      playReachMilestone();
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 }
      });
    }
  };

  return { points, animatePoints, controls };
};