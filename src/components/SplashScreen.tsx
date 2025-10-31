import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/splash-screen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        // Random increment for realistic loading feel
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className={`splash-screen ${isComplete ? 'complete' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Animated Background */}
      <div className="splash-background">
        <div className="splash-particle splash-particle-1"></div>
        <div className="splash-particle splash-particle-2"></div>
        <div className="splash-particle splash-particle-3"></div>
      </div>

      {/* Content Container */}
      <div className="splash-content">
        {/* Logo Animation */}
        <motion.div
          className="splash-logo-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <motion.img
            src="/1622D900-3727-4BCE-A0D4-565BDBA3A8F13.svg"
            alt="Brand Boost+"
            className="splash-logo"
            animate={{
              y: [0, -10, 0],
              rotateZ: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="splash-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1>Brand Boost+</h1>
          <p>Initializing AI Agency Platform</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="progress-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            >
              <div className="progress-bar-shimmer"></div>
            </motion.div>
          </div>
          <div className="progress-text">
            <span className="progress-percent">{Math.round(progress)}%</span>
            <span className="progress-label">Loading</span>
          </div>
        </motion.div>

        {/* Animated Dots */}
        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ●
          </motion.span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            ●
          </motion.span>
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            ●
          </motion.span>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <div className="splash-glow"></div>
    </motion.div>
  );
}
