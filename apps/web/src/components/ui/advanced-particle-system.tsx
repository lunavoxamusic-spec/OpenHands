'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  type: 'note' | 'star' | 'circle' | 'cassette';
}

interface AdvancedParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  interactive?: boolean;
  className?: string;
}

export function AdvancedParticleSystem({
  particleCount = 50,
  colors = ['#81ff8a', '#64965e', '#00ff88', '#44aa66'],
  interactive = true,
  className = ""
}: AdvancedParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createParticle = useCallback((x?: number, y?: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const types: Particle['type'][] = ['note', 'star', 'circle', 'cassette'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: Math.random(),
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      type
    };
  }, [colors]);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity * (1 - particle.life / particle.maxLife);
    ctx.fillStyle = particle.color;
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 2;

    switch (particle.type) {
      case 'note':
        // Draw musical note
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(particle.x + particle.size, particle.y);
        ctx.lineTo(particle.x + particle.size, particle.y - particle.size * 2);
        ctx.stroke();
        break;
        
      case 'star':
        // Draw star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const x = particle.x + Math.cos(angle) * particle.size;
          const y = particle.y + Math.sin(angle) * particle.size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          
          const innerAngle = ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
          const innerX = particle.x + Math.cos(innerAngle) * (particle.size * 0.5);
          const innerY = particle.y + Math.sin(innerAngle) * (particle.size * 0.5);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        break;
        
      case 'cassette':
        // Draw mini cassette
        ctx.fillRect(
          particle.x - particle.size,
          particle.y - particle.size * 0.6,
          particle.size * 2,
          particle.size * 1.2
        );
        ctx.beginPath();
        ctx.arc(particle.x - particle.size * 0.4, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.arc(particle.x + particle.size * 0.4, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        break;
        
      default:
        // Draw circle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }, []);

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Update life
    particle.life++;
    
    // Boundary collision
    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
    
    // Keep particles in bounds
    particle.x = Math.max(0, Math.min(canvas.width, particle.x));
    particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    
    // Mouse interaction
    if (interactive) {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += (dx / distance) * force * 0.5;
        particle.vy += (dy / distance) * force * 0.5;
      }
    }
    
    // Apply friction
    particle.vx *= 0.99;
    particle.vy *= 0.99;
    
    return particle.life < particle.maxLife;
  }, [interactive]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter(particle => {
      const alive = updateParticle(particle, canvas);
      if (alive) {
        drawParticle(ctx, particle);
      }
      return alive;
    });

    // Add new particles if needed
    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push(createParticle());
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [particleCount, createParticle, updateParticle, drawParticle]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create burst of particles at click location
    for (let i = 0; i < 10; i++) {
      const particle = createParticle(x, y);
      particle.vx = (Math.random() - 0.5) * 10;
      particle.vy = (Math.random() - 0.5) * 10;
      particle.size = Math.random() * 6 + 3;
      particlesRef.current.push(particle);
    }
  }, [createParticle]);

  useEffect(() => {
    const updateDimensions = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());
    
    // Start animation
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, createParticle, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onClick={interactive ? handleClick : undefined}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// Floating 3D Icons with Physics
interface Floating3DIconsProps {
  icons: string[];
  count?: number;
  className?: string;
}

export function Floating3DIcons({ 
  icons = ['🎵', '🎧', '🎤', '🎸', '🎹', '🎺'], 
  count = 15,
  className = ""
}: Floating3DIconsProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          {icons[Math.floor(Math.random() * icons.length)]}
        </motion.div>
      ))}
    </div>
  );
}

// Interactive Wave Background
export function InteractiveWaveBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const amplitude = 50;
    const frequency = 0.01;
    const speed = 0.02;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#81ff8a40');
    gradient.addColorStop(0.5, '#64965e60');
    gradient.addColorStop(1, '#81ff8a40');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Draw multiple waves
    for (let wave = 0; wave < 3; wave++) {
      ctx.beginPath();
      
      for (let x = 0; x <= canvas.width; x += 2) {
        const mouseInfluence = Math.exp(-Math.pow(x - mouseRef.current.x, 2) / 10000) * 30;
        const y = centerY + 
          Math.sin(x * frequency + timeRef.current + wave * Math.PI / 3) * amplitude +
          Math.sin(x * frequency * 2 + timeRef.current * 1.5 + wave * Math.PI / 2) * amplitude * 0.5 +
          mouseInfluence * Math.sin(timeRef.current * 2);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.globalAlpha = 0.7 - wave * 0.2;
      ctx.stroke();
    }

    timeRef.current += speed;
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// DNA Helix Animation
export function DNAHelixAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 400 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#81ff8a" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#64965e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#81ff8a" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Left strand */}
        <motion.path
          d="M100,0 Q200,100 100,200 Q0,300 100,400 Q200,500 100,600 Q0,700 100,800"
          fill="none"
          stroke="url(#helixGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M100,0 Q200,100 100,200 Q0,300 100,400 Q200,500 100,600 Q0,700 100,800",
              "M120,0 Q180,100 120,200 Q20,300 120,400 Q180,500 120,600 Q20,700 120,800",
              "M100,0 Q200,100 100,200 Q0,300 100,400 Q200,500 100,600 Q0,700 100,800"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Right strand */}
        <motion.path
          d="M300,0 Q200,100 300,200 Q400,300 300,400 Q200,500 300,600 Q400,700 300,800"
          fill="none"
          stroke="url(#helixGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{
            d: [
              "M300,0 Q200,100 300,200 Q400,300 300,400 Q200,500 300,600 Q400,700 300,800",
              "M280,0 Q220,100 280,200 Q380,300 280,400 Q220,500 280,600 Q380,700 280,800",
              "M300,0 Q200,100 300,200 Q400,300 300,400 Q200,500 300,600 Q400,700 300,800"
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Connecting lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1="100"
            y1={i * 100 + 50}
            x2="300"
            y2={i * 100 + 50}
            stroke="url(#helixGradient)"
            strokeWidth="2"
            strokeOpacity="0.6"
            animate={{
              strokeOpacity: [0.6, 1, 0.6],
              strokeWidth: [2, 3, 2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}