import { motion } from 'framer-motion';

interface AnimatedIllustrationProps {
  type: 'agent' | 'workflow' | 'success' | 'empty';
  size?: 'small' | 'medium' | 'large';
}

export default function AnimatedIllustration({ type, size = 'medium' }: AnimatedIllustrationProps) {
  const sizeMap = {
    small: 100,
    medium: 200,
    large: 300,
  };

  const dimension = sizeMap[size];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (type === 'agent') {
    return (
      <motion.svg
        width={dimension}
        height={dimension}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Robot head */}
        <motion.circle
          cx="100"
          cy="80"
          r="40"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          variants={itemVariants}
        />

        {/* Eyes */}
        <motion.circle
          cx="85"
          cy="70"
          r="5"
          fill="#64c8ff"
          variants={itemVariants}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="115"
          cy="70"
          r="5"
          fill="#64c8ff"
          variants={itemVariants}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />

        {/* Mouth */}
        <motion.path
          d="M 85 90 Q 100 100 115 90"
          stroke="#64c8ff"
          strokeWidth="2"
          fill="none"
          variants={itemVariants}
        />

        {/* Body */}
        <motion.rect
          x="70"
          y="120"
          width="60"
          height="50"
          rx="5"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          variants={itemVariants}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </motion.svg>
    );
  }

  if (type === 'workflow') {
    return (
      <motion.svg
        width={dimension}
        height={dimension}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Node 1 */}
        <motion.circle
          cx="50"
          cy="100"
          r="20"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          variants={itemVariants}
        />
        <motion.text
          x="50"
          y="105"
          textAnchor="middle"
          fill="#4ade80"
          fontSize="10"
          variants={itemVariants}
        >
          Start
        </motion.text>

        {/* Arrow 1 */}
        <motion.line
          x1="70"
          y1="100"
          x2="110"
          y2="100"
          stroke="#64c8ff"
          strokeWidth="2"
          variants={itemVariants}
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 1, repeat: Infinity }}
          strokeDasharray="10"
        />

        {/* Node 2 */}
        <motion.rect
          x="120"
          y="80"
          width="40"
          height="40"
          rx="5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          variants={itemVariants}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.text
          x="140"
          y="105"
          textAnchor="middle"
          fill="#3b82f6"
          fontSize="10"
          variants={itemVariants}
        >
          Process
        </motion.text>

        {/* Arrow 2 */}
        <motion.line
          x1="140"
          y1="120"
          x2="140"
          y2="160"
          stroke="#64c8ff"
          strokeWidth="2"
          variants={itemVariants}
          animate={{ strokeDashoffset: [0, -10] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          strokeDasharray="10"
        />

        {/* Node 3 */}
        <motion.circle
          cx="140"
          cy="180"
          r="15"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          variants={itemVariants}
        />
        <motion.text
          x="140"
          y="185"
          textAnchor="middle"
          fill="#ef4444"
          fontSize="10"
          variants={itemVariants}
        >
          End
        </motion.text>
      </motion.svg>
    );
  }

  if (type === 'success') {
    return (
      <motion.svg
        width={dimension}
        height={dimension}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Circle background */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          variants={itemVariants}
          animate={{ scale: [0.8, 1] }}
          transition={{ duration: 0.6 }}
        />

        {/* Checkmark */}
        <motion.path
          d="M 70 100 L 90 120 L 130 70"
          stroke="#4ade80"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={itemVariants}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      </motion.svg>
    );
  }

  // Empty state
  return (
    <motion.svg
      width={dimension}
      height={dimension}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Folder icon */}
      <motion.path
        d="M 30 60 L 30 170 Q 30 180 40 180 L 160 180 Q 170 180 170 170 L 170 80 Q 170 70 160 70 L 90 70 L 70 50 Q 60 40 50 40 L 40 40 Q 30 40 30 50 Z"
        fill="none"
        stroke="#64c8ff"
        strokeWidth="2"
        variants={itemVariants}
      />

      {/* Plus icon */}
      <motion.line
        x1="100"
        y1="110"
        x2="100"
        y2="150"
        stroke="#64c8ff"
        strokeWidth="3"
        strokeLinecap="round"
        variants={itemVariants}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.line
        x1="80"
        y1="130"
        x2="120"
        y2="130"
        stroke="#64c8ff"
        strokeWidth="3"
        strokeLinecap="round"
        variants={itemVariants}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}
