'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CursorEffects, 
  FloatingElements, 
  Interactive3DCard, 
  MagneticButton, 
  ParallaxContainer 
} from '../ui/3d-cursor-effects';
import { 
  GlassmorphismCard, 
  Floating3DIcon, 
  MorphingBlob, 
  Premium3DCassette, 
  LiquidButton, 
  HolographicText 
} from '../ui/premium-3d-elements';
import { 
  AdvancedParticleSystem, 
  Floating3DIcons, 
  InteractiveWaveBackground, 
  DNAHelixAnimation 
} from '../ui/advanced-particle-system';

export function PremiumHeroSection() {
  const [preRegistrations, setPreRegistrations] = useState(12847);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreRegistrations(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const musicIcons = ['🎵', '🎧', '🎤', '🎸', '🎹', '🎺', '🥁', '🎻', '🎷', '🎼'];

  return (
    <CursorEffects>
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <InteractiveWaveBackground />
          <DNAHelixAnimation className="opacity-20" />
          <MorphingBlob />
          <AdvancedParticleSystem 
            particleCount={80}
            colors={['#81ff8a', '#64965e', '#00ff88', '#44aa66', '#66ffaa']}
            interactive={true}
          />
          <Floating3DIcons icons={musicIcons} count={20} />
        </div>

        <FloatingElements />

        <div className="relative z-20 container mx-auto px-4 py-20">
          <motion.div 
            className="text-center"
            style={{ y: y1, opacity }}
          >
            {/* Main Logo with 3D Effect */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotateY: -180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Interactive3DCard className="inline-block">
                <div className="relative">
                  <HolographicText className="text-8xl md:text-9xl font-black mb-4">
                    TUNOVA
                  </HolographicText>
                  
                  {/* Floating 3D Icons around logo */}
                  <div className="absolute -top-10 -left-10">
                    <Floating3DIcon 
                      icon="🎵" 
                      size="lg" 
                      color="#81ff8a" 
                      delay={0} 
                    />
                  </div>
                  <div className="absolute -top-5 -right-10">
                    <Floating3DIcon 
                      icon="🎧" 
                      size="md" 
                      color="#64965e" 
                      delay={1} 
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5">
                    <Floating3DIcon 
                      icon="🎤" 
                      size="md" 
                      color="#00ff88" 
                      delay={2} 
                    />
                  </div>
                  <div className="absolute -bottom-10 -right-5">
                    <Floating3DIcon 
                      icon="🎸" 
                      size="lg" 
                      color="#44aa66" 
                      delay={0.5} 
                    />
                  </div>
                </div>
              </Interactive3DCard>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-12"
            >
              <HolographicText className="text-2xl md:text-4xl font-bold mb-4">
                El Futuro de la Música Web3
              </HolographicText>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Descubre, crea y colecciona música en la primera plataforma descentralizada 
                con estética retro cassette y tecnología blockchain de vanguardia.
              </motion.p>
            </motion.div>

            {/* 3D Cassette Player */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div 
                className="cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Premium3DCassette isPlaying={isPlaying} />
              </div>
              <motion.p 
                className="text-sm text-gray-400 mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Haz clic en el cassette para {isPlaying ? 'pausar' : 'reproducir'}
              </motion.p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <GlassmorphismCard className="p-6 text-center">
                <motion.div
                  className="text-3xl font-bold text-[#81ff8a] mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 10px #81ff8a40',
                      '0 0 20px #81ff8a60',
                      '0 0 10px #81ff8a40'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {preRegistrations.toLocaleString()}
                </motion.div>
                <p className="text-gray-300">Pre-registros</p>
              </GlassmorphismCard>

              <GlassmorphismCard className="p-6 text-center" glowColor="#64965e">
                <motion.div
                  className="text-3xl font-bold text-[#64965e] mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 10px #64965e40',
                      '0 0 20px #64965e60',
                      '0 0 10px #64965e40'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  50K+
                </motion.div>
                <p className="text-gray-300">NFTs Creados</p>
              </GlassmorphismCard>

              <GlassmorphismCard className="p-6 text-center" glowColor="#00ff88">
                <motion.div
                  className="text-3xl font-bold text-[#00ff88] mb-2"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 10px #00ff8840',
                      '0 0 20px #00ff8860',
                      '0 0 10px #00ff8840'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  1.2M+
                </motion.div>
                <p className="text-gray-300">Streams</p>
              </GlassmorphismCard>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <LiquidButton 
                size="lg"
                onClick={() => {
                  document.getElementById('pre-registration')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                🚀 Únete a la Revolución
              </LiquidButton>

              <LiquidButton 
                variant="secondary"
                size="lg"
                onClick={() => {
                  document.getElementById('minigames')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                🎮 Jugar Minijuegos
              </LiquidButton>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-6 h-10 border-2 border-[#81ff8a] rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-[#81ff8a] rounded-full mt-2"
                  animate={{
                    y: [0, 12, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Scroll para explorar</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Parallax Background Elements */}
        <ParallaxContainer speed={0.3} className="absolute inset-0 z-10">
          <div className="absolute top-20 left-10">
            <Floating3DIcon icon="🎼" size="lg" color="#81ff8a" delay={0} />
          </div>
          <div className="absolute top-40 right-20">
            <Floating3DIcon icon="🎹" size="md" color="#64965e" delay={1} />
          </div>
          <div className="absolute bottom-40 left-20">
            <Floating3DIcon icon="🥁" size="lg" color="#00ff88" delay={2} />
          </div>
          <div className="absolute bottom-20 right-10">
            <Floating3DIcon icon="🎷" size="md" color="#44aa66" delay={0.5} />
          </div>
        </ParallaxContainer>

        <ParallaxContainer speed={0.5} className="absolute inset-0 z-5">
          <div className="absolute top-60 left-1/4">
            <Floating3DIcon icon="🎻" size="sm" color="#66ffaa" delay={1.5} />
          </div>
          <div className="absolute top-80 right-1/3">
            <Floating3DIcon icon="🎺" size="sm" color="#81ff8a" delay={2.5} />
          </div>
          <div className="absolute bottom-60 left-1/3">
            <Floating3DIcon icon="🪘" size="sm" color="#64965e" delay={3} />
          </div>
        </ParallaxContainer>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      </section>
    </CursorEffects>
  );
}