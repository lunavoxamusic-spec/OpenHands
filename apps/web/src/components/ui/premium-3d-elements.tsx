'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Glassmorphism 3D Card with Hover Effects
interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlassmorphismCard({ 
  children, 
  className = "", 
  glowColor = "#81ff8a" 
}: GlassmorphismCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(${isHovered ? 30 : 0}px)
      scale(${isHovered ? 1.02 : 1})
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white/10 to-white/5
        backdrop-blur-xl border border-white/20
        shadow-2xl transition-all duration-300 ease-out
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ 
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${glowColor}40, 0 0 0 1px ${glowColor}20`
          : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}20 0%, transparent 70%)`,
          opacity: isHovered ? 0.6 : 0.3
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine Effect */}
      <div 
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-300
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          transform -skew-x-12 -translate-x-full
          ${isHovered ? 'animate-shine' : ''}
        `}
      />
    </div>
  );
}

// 3D Floating Icon with Physics
interface Floating3DIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  delay?: number;
}

export function Floating3DIcon({ 
  icon, 
  size = 'md', 
  color = '#81ff8a',
  delay = 0 
}: Floating3DIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        relative flex items-center justify-center
        rounded-2xl bg-gradient-to-br from-white/20 to-white/5
        backdrop-blur-md border border-white/30
        shadow-lg cursor-pointer
      `}
      initial={{ y: 0, rotateY: 0, rotateX: 0 }}
      animate={{
        y: [0, -10, 0],
        rotateY: [0, 15, -15, 0],
        rotateX: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.1,
        rotateY: 180,
        transition: { duration: 0.3 }
      }}
      style={{
        boxShadow: `0 10px 30px ${color}30`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="text-2xl"
        style={{ color }}
      >
        {icon}
      </div>
      
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-50 blur-md"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
}

// Morphing Blob Background
export function MorphingBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81ff8a" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#64965e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#81ff8a" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d="M200,50 C300,50 350,150 350,200 C350,300 250,350 200,350 C100,350 50,250 50,200 C50,100 150,50 200,50 Z"
          fill="url(#blobGradient)"
          animate={{
            d: [
              "M200,50 C300,50 350,150 350,200 C350,300 250,350 200,350 C100,350 50,250 50,200 C50,100 150,50 200,50 Z",
              "M180,60 C280,40 360,140 360,200 C360,280 280,360 200,340 C120,360 40,280 40,200 C40,120 120,40 180,60 Z",
              "M220,40 C320,60 340,160 340,200 C340,320 240,340 200,340 C80,340 60,240 60,200 C60,80 160,60 220,40 Z",
              "M200,50 C300,50 350,150 350,200 C350,300 250,350 200,350 C100,350 50,250 50,200 C50,100 150,50 200,50 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

// 3D Cassette Player with Realistic Animation
export function Premium3DCassette({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <motion.div
      className="relative w-64 h-40 mx-auto"
      initial={{ rotateY: -15, rotateX: 5 }}
      animate={{ 
        rotateY: [-15, 15, -15],
        rotateX: [5, -5, 5]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Cassette Body */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700">
        {/* Top Label */}
        <div className="absolute top-2 left-4 right-4 h-16 bg-gradient-to-r from-white to-gray-100 rounded shadow-inner">
          <div className="p-2 text-xs text-gray-800 font-mono">
            <div className="font-bold">TUNOVA MIX</div>
            <div className="text-gray-600">Web3 Beats Vol.1</div>
          </div>
        </div>
        
        {/* Tape Reels */}
        <div className="absolute bottom-6 left-8 w-12 h-12 bg-gray-700 rounded-full border-2 border-gray-600 flex items-center justify-center">
          <motion.div 
            className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={isPlaying ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
          >
            <div className="w-full h-full rounded-full border-2 border-gray-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-6 right-8 w-12 h-12 bg-gray-700 rounded-full border-2 border-gray-600 flex items-center justify-center">
          <motion.div 
            className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full"
            animate={isPlaying ? { rotate: -360 } : {}}
            transition={isPlaying ? { duration: 1.5, repeat: Infinity, ease: "linear" } : {}}
          >
            <div className="w-full h-full rounded-full border-2 border-gray-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </motion.div>
        </div>
        
        {/* Tape */}
        <div className="absolute bottom-8 left-20 right-20 h-2 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full shadow-inner" />
        
        {/* Screws */}
        {[
          { top: '10px', left: '10px' },
          { top: '10px', right: '10px' },
          { bottom: '10px', left: '10px' },
          { bottom: '10px', right: '10px' }
        ].map((pos, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 bg-gray-600 rounded-full border border-gray-500 shadow-inner"
            style={pos}
          >
            <div className="absolute inset-0.5 bg-gray-700 rounded-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 3D Shadow */}
      <div 
        className="absolute inset-0 bg-black/30 rounded-lg blur-xl transform translate-y-4 translate-x-2 -z-10"
        style={{ transform: 'translateZ(-20px) translateY(20px) translateX(10px)' }}
      />
    </motion.div>
  );
}

// Liquid Button with 3D Effect
interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function LiquidButton({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md' 
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = {
    primary: {
      bg: 'from-[#81ff8a] to-[#64965e]',
      shadow: '#81ff8a',
      text: 'text-black'
    },
    secondary: {
      bg: 'from-purple-500 to-pink-500',
      shadow: '#a855f7',
      text: 'text-white'
    }
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    button.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(10px)
    `;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    setIsHovered(false);
    buttonRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden rounded-full font-semibold
        bg-gradient-to-r ${colors[variant].bg} ${colors[variant].text}
        ${sizes[size]} transition-all duration-300 ease-out
        transform-gpu hover:scale-105 active:scale-95
        shadow-lg hover:shadow-xl
      `}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? `0 20px 40px ${colors[variant].shadow}40, 0 0 0 1px ${colors[variant].shadow}30`
          : `0 10px 20px ${colors[variant].shadow}30`
      }}
    >
      {/* Liquid Animation */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            borderRadius: '50%',
            filter: 'blur(10px)'
          }}
        />
      </div>
      
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 0.6 }}
      />
    </button>
  );
}

// Holographic Text Effect
interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicText({ children, className = "" }: HolographicTextProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative z-10 bg-gradient-to-r from-[#81ff8a] via-cyan-400 to-[#64965e] bg-clip-text text-transparent font-bold"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      >
        {children}
      </motion.div>
      
      {/* Glitch Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent font-bold opacity-30"
        animate={{
          x: [0, 2, -2, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {children}
      </motion.div>
      
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 blur-md opacity-50 bg-gradient-to-r from-[#81ff8a] to-[#64965e] bg-clip-text text-transparent font-bold"
      >
        {children}
      </div>
    </div>
  );
}