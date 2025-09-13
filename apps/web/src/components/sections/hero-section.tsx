'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, PlayIcon } from '@heroicons/react/24/outline';
import { TunovaLogo } from '@/components/ui/tunova-logo';
import { ParticleField } from '@/components/ui/particle-field';
import { CassettePlayer } from '@/components/ui/cassette-player';

export function HeroSection() {
  const [preRegistrations, setPreRegistrations] = useState(12847);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate real-time counter updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPreRegistrations(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToMinigames = () => {
    const element = document.querySelector('#minigames');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <ParticleField />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(129,255,138,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(129,255,138,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex justify-center"
          >
            <TunovaLogo className="h-20 w-auto" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-retro">
              <span className="block text-white">El Futuro de la</span>
              <span className="block neon-text animate-glow">Música Web3</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-display"
            >
              Descubre, colecciona y crea música en una plataforma descentralizada 
              con la estética retro de los cassettes y la tecnología del futuro.
            </motion.p>
          </motion.div>

          {/* Cassette Player Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center my-12"
          >
            <CassettePlayer 
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
            />
          </motion.div>

          {/* Pre-registration Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-dark-800/50 backdrop-blur-md border border-neon-green/30 rounded-2xl p-6 max-w-md mx-auto"
          >
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm font-display">Pre-registros en tiempo real</p>
              <motion.div
                key={preRegistrations}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-3xl font-bold neon-text font-retro"
              >
                {preRegistrations.toLocaleString()}
              </motion.div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-xs text-gray-500">Usuarios esperando</span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(129, 255, 138, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToMinigames}
              className="btn-neon px-8 py-4 text-lg font-semibold group relative overflow-hidden"
            >
              <span className="relative z-10">Únete a la Revolución</span>
              <motion.div
                className="absolute inset-0 bg-neon-green"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-300 hover:text-neon-green transition-colors duration-200 px-6 py-3 border border-gray-600 hover:border-neon-green rounded-lg"
            >
              <PlayIcon className="w-5 h-5" />
              <span>Ver Demo</span>
            </motion.button>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { icon: '🎧', title: 'Reproductor Retro', desc: 'Cassette player con animaciones realistas' },
              { icon: '🎮', title: 'Mini-juegos', desc: 'Gana NOVA points jugando' },
              { icon: '🖼️', title: 'NFT Marketplace', desc: 'Colecciona arte musical único' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="card-neon p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-neon-green mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToMinigames}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-neon-green hover:text-white transition-colors duration-200"
        >
          <ChevronDownIcon className="w-8 h-8" />
        </motion.button>
      </motion.div>
    </section>
  );
}