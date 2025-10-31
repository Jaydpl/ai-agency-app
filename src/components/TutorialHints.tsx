import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/tutorial-hints.css';

interface Hint {
  id: string;
  title: string;
  description: string;
  icon: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialHintsProps {
  hints: Hint[];
  onClose?: (id: string) => void;
}

export default function TutorialHints({ hints, onClose }: TutorialHintsProps) {
  const [visibleHints, setVisibleHints] = useState<Set<string>>(new Set());
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Show hints one by one
    hints.forEach((hint, index) => {
      setTimeout(() => {
        if (!dismissedHints.has(hint.id)) {
          setVisibleHints((prev) => new Set([...prev, hint.id]));
        }
      }, index * 1000);
    });
  }, [hints, dismissedHints]);

  const handleDismiss = (id: string) => {
    setVisibleHints((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    setDismissedHints((prev) => new Set([...prev, id]));
    onClose?.(id);
  };

  return (
    <div className="tutorial-hints-container">
      <AnimatePresence>
        {hints.map((hint) => (
          visibleHints.has(hint.id) && (
            <motion.div
              key={hint.id}
              className={`tutorial-hint hint-${hint.position}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="hint-content">
                <div className="hint-header">
                  <span className="hint-icon">{hint.icon}</span>
                  <h4 className="hint-title">{hint.title}</h4>
                  <motion.button
                    className="hint-close"
                    onClick={() => handleDismiss(hint.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
                <p className="hint-description">{hint.description}</p>
              </div>
              <div className="hint-pointer"></div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
}
