'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

const roadmapPhases = [
  {
    id: 1,
    phase: 'Fase 1',
    title: 'Fundación',
    quarter: 'Q1 2024',
    status: 'completed',
    progress: 100,
    items: [
      'Desarrollo de la plataforma web',
      'Sistema de pre-registro',
      'Mini-juegos interactivos',
      'Integración Web3 básica',
      'Comunidad en Discord',
    ],
  },
  {
    id: 2,
    phase: 'Fase 2',
    title: 'Lanzamiento Beta',
    quarter: 'Q2 2024',
    status: 'in-progress',
    progress: 75,
    items: [
      'Reproductor cassette funcional',
      'Marketplace NFT básico',
      'Sistema de tokens TUNE/NOVA',
      'Aplicación móvil beta',
      'Programa de artistas pioneros',
    ],
  },
  {
    id: 3,
    phase: 'Fase 3',
    title: 'Expansión',
    quarter: 'Q3 2024',
    status: 'upcoming',
    progress: 25,
    items: [
      'IA generativa para covers',
      'Streaming de audio completo',
      'Herramientas para productores',
      'Integración multi-chain',
      'Programa de staking',
    ],
  },
  {
    id: 4,
    phase: 'Fase 4',
    title: 'Ecosistema Completo',
    quarter: 'Q4 2024',
    status: 'planned',
    progress: 0,
    items: [
      'Plataforma de colaboración',
      'Conciertos virtuales',
      'DAO de gobernanza',
      'Integración con plataformas externas',
      'Programa de incubación de artistas',
    ],
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircleIcon,
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green',
  },
  'in-progress': {
    icon: ClockIcon,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400',
  },
  upcoming: {
    icon: RocketLaunchIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400',
  },
  planned: {
    icon: RocketLaunchIcon,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400',
  },
};

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
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
            <span className="neon-text">Roadmap</span> Interactivo
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-display">
            Nuestro viaje hacia el futuro de la música Web3. Cada fase nos acerca más 
            a una experiencia musical completamente descentralizada.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-green via-yellow-400 to-gray-400 rounded-full" />

          {/* Roadmap Items */}
          <div className="space-y-16">
            {roadmapPhases.map((phase, index) => {
              const config = statusConfig[phase.status as keyof typeof statusConfig];
              const Icon = config.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-12 h-12 rounded-full border-4 ${config.borderColor} ${config.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`w-full max-w-md ${
                      isLeft ? 'mr-auto pr-16' : 'ml-auto pl-16'
                    }`}
                  >
                    <div className={`card-neon p-8 ${config.bgColor} border-2 ${config.borderColor}`}>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className={`text-sm font-semibold ${config.color} mb-1`}>
                            {phase.phase}
                          </div>
                          <h3 className="text-2xl font-bold text-white font-retro">
                            {phase.title}
                          </h3>
                        </div>
                        <div className={`text-sm font-semibold ${config.color} bg-dark-800 px-3 py-1 rounded-full`}>
                          {phase.quarter}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Progreso</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <div className="w-full bg-dark-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${phase.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              phase.status === 'completed'
                                ? 'from-neon-green to-green-400'
                                : phase.status === 'in-progress'
                                ? 'from-yellow-400 to-orange-400'
                                : 'from-blue-400 to-purple-400'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div className={`w-2 h-2 rounded-full ${
                              phase.status === 'completed'
                                ? 'bg-neon-green'
                                : phase.status === 'in-progress'
                                ? 'bg-yellow-400'
                                : 'bg-gray-400'
                            }`} />
                            <span className="text-gray-300 text-sm">{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Action Button */}
                      {phase.status === 'in-progress' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-6 w-full btn-neon py-2 text-sm"
                        >
                          Ver Progreso Detallado
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-12">
            <h3 className="text-3xl font-bold mb-6 neon-text font-retro">
              🚀 Visión 2025+
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Tunova se convertirá en el ecosistema musical Web3 más completo del mundo, 
              donde artistas, fans y productores colaboran en un entorno descentralizado, 
              justo y transparente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🌍',
                  title: 'Alcance Global',
                  desc: '10M+ usuarios activos en todo el mundo',
                },
                {
                  icon: '🎵',
                  title: 'Biblioteca Infinita',
                  desc: '1M+ tracks y NFTs musicales únicos',
                },
                {
                  icon: '💰',
                  title: 'Economía Justa',
                  desc: '$100M+ distribuidos a artistas',
                },
              ].map((vision, index) => (
                <motion.div
                  key={vision.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{vision.icon}</div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    {vision.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{vision.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Documentation Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <h4 className="text-xl font-semibold mb-6">📚 Documentación Técnica</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Whitepaper', url: '#' },
              { name: 'Tokenomics', url: '#' },
              { name: 'API Docs', url: '#' },
              { name: 'Smart Contracts', url: '#' },
            ].map((doc) => (
              <motion.a
                key={doc.name}
                href={doc.url}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-dark-700 hover:bg-dark-600 border border-gray-600 hover:border-neon-green rounded-lg text-gray-300 hover:text-neon-green transition-all duration-200"
              >
                {doc.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}