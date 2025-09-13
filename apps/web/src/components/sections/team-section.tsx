'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Rodriguez',
    role: 'CEO & Founder',
    bio: 'Ex-Spotify, 10+ años en música digital',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/alexrodriguez',
    quote: 'La música es el lenguaje universal, Web3 es su futuro.',
    expertise: ['Product Strategy', 'Music Industry', 'Web3'],
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'CTO',
    bio: 'Ex-Google, especialista en blockchain',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/mariasantos',
    quote: 'Construyendo la infraestructura del futuro musical.',
    expertise: ['Blockchain', 'Full-Stack', 'AI/ML'],
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Head of Design',
    bio: 'Ex-Apple, diseñador de experiencias',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/davidchen',
    quote: 'El diseño debe ser tan hermoso como la música.',
    expertise: ['UI/UX', 'Brand Design', 'Motion Graphics'],
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Head of Community',
    bio: 'Ex-Discord, experta en comunidades',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    quote: 'Las mejores plataformas las construye la comunidad.',
    expertise: ['Community Building', 'Social Media', 'Content Strategy'],
  },
  {
    id: 5,
    name: 'Carlos Mendez',
    role: 'Blockchain Developer',
    bio: 'Ex-Ethereum Foundation, smart contracts',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/carlosmendez',
    quote: 'Código limpio, contratos seguros, futuro descentralizado.',
    expertise: ['Solidity', 'DeFi', 'Security Audits'],
  },
  {
    id: 6,
    name: 'Emma Wilson',
    role: 'Music Partnerships',
    bio: 'Ex-Universal Music, relaciones artistas',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/emmawilson',
    quote: 'Conectando artistas con el futuro de la música.',
    expertise: ['Artist Relations', 'Music Business', 'Partnerships'],
  },
];

const advisors = [
  {
    id: 1,
    name: 'Dr. Michael Thompson',
    role: 'Advisor - Music Tech',
    bio: 'Profesor MIT, pionero en música digital',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/michaelthompson',
    expertise: ['Music Technology', 'Academic Research', 'Innovation'],
  },
  {
    id: 2,
    name: 'Lisa Park',
    role: 'Advisor - Web3',
    bio: 'Ex-Coinbase, experta en crypto',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/lisapark',
    expertise: ['Cryptocurrency', 'DeFi', 'Tokenomics'],
  },
  {
    id: 3,
    name: 'Roberto Silva',
    role: 'Advisor - Music Industry',
    bio: 'Ex-Sony Music, 20+ años industria',
    image: '/api/placeholder/150/150',
    linkedin: 'https://linkedin.com/in/robertosilva',
    expertise: ['Music Industry', 'Artist Development', 'Global Markets'],
  },
];

export function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'team' | 'advisors'>('team');
  
  const currentData = activeTab === 'team' ? teamMembers : advisors;
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(currentData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return currentData.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-retro mb-6">
            <span className="neon-text">Equipo</span> & Asesores
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-display">
            Un equipo diverso de expertos en música, tecnología y Web3, 
            unidos por la pasión de revolucionar la industria musical.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-dark-800/50 backdrop-blur-md border border-gray-600 rounded-xl p-2">
            {[
              { key: 'team', label: 'Equipo Principal', count: teamMembers.length },
              { key: 'advisors', label: 'Asesores', count: advisors.length },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(tab.key as 'team' | 'advisors');
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-neon-green text-dark-950'
                    : 'text-gray-300 hover:text-neon-green'
                }`}
              >
                {tab.label} ({tab.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              className="p-3 bg-dark-700 hover:bg-dark-600 border border-gray-600 hover:border-neon-green rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-6 h-6 text-gray-300" />
            </motion.button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? 'bg-neon-green'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              className="p-3 bg-dark-700 hover:bg-dark-600 border border-gray-600 hover:border-neon-green rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-6 h-6 text-gray-300" />
            </motion.button>
          </div>

          {/* Cards Grid */}
          <motion.div
            key={`${activeTab}-${currentSlide}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getCurrentItems().map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-neon p-8 text-center group"
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-neon-green to-blue-400 p-1">
                    <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center text-4xl font-bold text-neon-green">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  {/* LinkedIn Link */}
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-neon-green font-semibold">{member.role}</p>
                    <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                  </div>

                  {/* Quote (only for team members) */}
                  {activeTab === 'team' && 'quote' in member && (
                    <blockquote className="text-gray-300 text-sm italic border-l-2 border-neon-green pl-4">
                      "{(member as any).quote}"
                    </blockquote>
                  )}

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-dark-700 text-gray-300 text-xs rounded-full border border-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-6 neon-text font-retro">
              🚀 ¿Quieres Unirte?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Estamos buscando talento excepcional para construir el futuro de la música Web3. 
              Si compartes nuestra visión, nos encantaría conocerte.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:careers@tunova.io"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-neon px-8 py-4 text-lg font-semibold"
              >
                Ver Posiciones Abiertas
              </motion.a>
              
              <motion.a
                href="mailto:partnerships@tunova.io"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Convertirse en Asesor
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '15+', label: 'Miembros del Equipo' },
            { number: '5+', label: 'Países Representados' },
            { number: '50+', label: 'Años de Experiencia Combinada' },
            { number: '3', label: 'Asesores de Clase Mundial' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold neon-text font-retro mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}