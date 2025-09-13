'use client';

import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

interface CassettePlayerProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  className?: string;
}

export function CassettePlayer({ isPlaying, onPlayToggle, className = '' }: CassettePlayerProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 ${className}`}
      style={{
        background: 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.4)',
      }}
    >
      {/* Cassette Body */}
      <div className="relative w-80 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border-2 border-gray-600 overflow-hidden">
        {/* Top Label Area */}
        <div className="absolute top-4 left-4 right-4 h-8 bg-white/90 rounded flex items-center justify-center">
          <span className="text-black text-sm font-bold font-retro">TUNOVA MIX</span>
        </div>

        {/* Cassette Window */}
        <div className="absolute top-16 left-8 right-8 bottom-16 bg-black/80 rounded border border-gray-500 flex items-center justify-center space-x-8">
          {/* Left Reel */}
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            className="w-16 h-16 border-4 border-neon-green rounded-full relative"
          >
            <div className="absolute inset-2 border-2 border-neon-green/50 rounded-full" />
            <div className="absolute inset-4 bg-neon-green/20 rounded-full" />
            {/* Reel spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-0.5 h-6 bg-neon-green/60 top-1/2 left-1/2 origin-bottom"
                style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
              />
            ))}
          </motion.div>

          {/* Right Reel */}
          <motion.div
            animate={isPlaying ? { rotate: -360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
            className="w-16 h-16 border-4 border-neon-green rounded-full relative"
          >
            <div className="absolute inset-2 border-2 border-neon-green/50 rounded-full" />
            <div className="absolute inset-4 bg-neon-green/20 rounded-full" />
            {/* Reel spokes */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute w-0.5 h-6 bg-neon-green/60 top-1/2 left-1/2 origin-bottom"
                style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
              />
            ))}
          </motion.div>
        </div>

        {/* Tape Animation */}
        {isPlaying && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 100 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 right-20 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-60"
          />
        )}

        {/* Bottom Holes */}
        <div className="absolute bottom-4 left-8 w-4 h-4 bg-black rounded-full border border-gray-500" />
        <div className="absolute bottom-4 right-8 w-4 h-4 bg-black rounded-full border border-gray-500" />

        {/* Side Labels */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-400">
          SIDE A
        </div>
      </div>

      {/* Control Panel */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full border border-gray-600 transition-colors"
        >
          <BackwardIcon className="w-5 h-5 text-gray-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPlayToggle}
          className="p-4 bg-neon-green hover:bg-neon-green-dark rounded-full border-2 border-neon-green shadow-neon transition-all duration-200"
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 text-dark-950" />
          ) : (
            <PlayIcon className="w-6 h-6 text-dark-950 ml-0.5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full border border-gray-600 transition-colors"
        >
          <ForwardIcon className="w-5 h-5 text-gray-300" />
        </motion.button>
      </div>

      {/* VU Meters */}
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-gray-700 rounded-full overflow-hidden"
            style={{ height: '40px' }}
          >
            <motion.div
              className="w-full bg-gradient-to-t from-neon-green via-yellow-400 to-red-500 rounded-full"
              animate={isPlaying ? {
                height: [`${Math.random() * 20 + 10}%`, `${Math.random() * 80 + 20}%`]
              } : { height: '10%' }}
              transition={{
                duration: 0.1,
                repeat: isPlaying ? Infinity : 0,
                repeatType: 'reverse',
                delay: i * 0.05,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* LED Display */}
      <div className="mt-4 bg-black rounded px-4 py-2 border border-gray-600">
        <div className="text-neon-green font-mono text-sm text-center">
          {isPlaying ? (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ♪ NOW PLAYING ♪
            </motion.span>
          ) : (
            'PRESS PLAY'
          )}
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={isPlaying ? {
          boxShadow: [
            '0 0 20px rgba(129, 255, 138, 0.3)',
            '0 0 40px rgba(129, 255, 138, 0.5)',
            '0 0 20px rgba(129, 255, 138, 0.3)',
          ]
        } : {}}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
      />
    </motion.div>
  );
}