'use client';

import { motion } from 'framer-motion';

interface TunovaLogoProps {
  className?: string;
  animated?: boolean;
}

export function TunovaLogo({ className = '', animated = true }: TunovaLogoProps) {
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
  };

  const cassetteVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  return (
    <motion.div
      variants={animated ? logoVariants : undefined}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={`flex items-center space-x-2 ${className}`}
    >
      {/* Cassette Icon */}
      <div className="relative">
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-neon-green"
        >
          {/* Cassette Body */}
          <rect
            x="2"
            y="6"
            width="28"
            height="20"
            rx="2"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          
          {/* Cassette Window */}
          <rect
            x="4"
            y="8"
            width="24"
            height="8"
            rx="1"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1"
          />
          
          {/* Left Reel */}
          <motion.circle
            cx="10"
            cy="12"
            r="3"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1"
            variants={animated ? cassetteVariants : undefined}
            animate={animated ? "animate" : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Right Reel */}
          <motion.circle
            cx="22"
            cy="12"
            r="3"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="1"
            variants={animated ? cassetteVariants : undefined}
            animate={animated ? "animate" : undefined}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
          
          {/* Tape */}
          <path
            d="M13 12 Q16 10 19 12"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Cassette Holes */}
          <circle cx="6" cy="20" r="1" fill="currentColor" />
          <circle cx="26" cy="20" r="1" fill="currentColor" />
          
          {/* Label Area */}
          <rect
            x="6"
            y="18"
            width="20"
            height="6"
            rx="1"
            fill="currentColor"
            fillOpacity="0.05"
          />
        </motion.svg>
        
        {/* Glow Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-neon-green opacity-20 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <motion.span
          className="text-xl font-bold font-retro text-neon-green"
          animate={animated ? {
            textShadow: [
              "0 0 5px #81ff8a",
              "0 0 10px #81ff8a, 0 0 20px #81ff8a",
              "0 0 5px #81ff8a",
            ],
          } : undefined}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          TUNOVA
        </motion.span>
        <span className="text-xs text-gray-400 font-display -mt-1">
          Web3 Music
        </span>
      </div>
    </motion.div>
  );
}