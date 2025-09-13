'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { CassetteCollectorGame } from '@/components/minigames/cassette-collector';
import { BeatCreatorGame } from '@/components/minigames/beat-creator';
import { NFTPuzzleGame } from '@/components/minigames/nft-puzzle';

const minigames = [
  {
    id: 'cassette-collector',
    name: 'Cassette Collector',
    description: 'Colecciona cassettes virtuales y gana puntos NOVA',
    icon: '📼',
    color: 'from-purple-500 to-pink-500',
    component: CassetteCollectorGame,
  },
  {
    id: 'beat-creator',
    name: 'Beat Creator',
    description: 'Crea beats de 8 segundos con samples retro',
    icon: '🎵',
    color: 'from-blue-500 to-cyan-500',
    component: BeatCreatorGame,
  },
  {
    id: 'nft-puzzle',
    name: 'NFT Puzzle',
    description: 'Resuelve puzzles de covers musicales generadas por IA',
    icon: '🧩',
    color: 'from-green-500 to-emerald-500',
    component: NFTPuzzleGame,
  },
];

export function MinigamesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="minigames" className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
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
            <span className="neon-text">Mini-juegos</span> Interactivos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-display">
            Juega, gana puntos NOVA y desbloquea recompensas exclusivas mientras te diviertes 
            con nuestros mini-juegos temáticos de música retro.
          </p>
        </motion.div>

        {/* Games Tabs */}
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex flex-wrap justify-center gap-4 mb-12">
            {minigames.map((game, index) => (
              <Tab key={game.id} as="div" className="focus:outline-none">
                {({ selected }) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative px-6 py-4 rounded-xl border-2 transition-all duration-300
                      ${selected 
                        ? 'border-neon-green bg-neon-green/10 text-neon-green' 
                        : 'border-gray-600 bg-dark-800/50 text-gray-300 hover:border-neon-green/50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{game.icon}</span>
                      <div className="text-left">
                        <div className="font-semibold">{game.name}</div>
                        <div className="text-sm opacity-75">{game.description}</div>
                      </div>
                    </div>
                    
                    {selected && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-green/20 to-transparent"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            {minigames.map((game, index) => (
              <Tab.Panel key={game.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-dark-800/30 backdrop-blur-md border border-neon-green/20 rounded-2xl p-8"
                >
                  <game.component />
                </motion.div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Leaderboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 bg-dark-800/50 backdrop-blur-md border border-neon-green/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-8 neon-text font-retro">
            🏆 Leaderboard Global
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { rank: 1, name: 'CryptoBeats', points: 15420, badge: '🥇' },
              { rank: 2, name: 'RetroVibes', points: 12890, badge: '🥈' },
              { rank: 3, name: 'NovaHunter', points: 11250, badge: '🥉' },
            ].map((player) => (
              <motion.div
                key={player.rank}
                whileHover={{ scale: 1.02 }}
                className="bg-dark-700/50 border border-gray-600 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-2">{player.badge}</div>
                <div className="font-semibold text-lg text-neon-green">{player.name}</div>
                <div className="text-gray-400">#{player.rank}</div>
                <div className="text-2xl font-bold mt-2 neon-text">
                  {player.points.toLocaleString()} NOVA
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-neon px-6 py-3"
            >
              Ver Leaderboard Completo
            </motion.button>
          </div>
        </motion.div>

        {/* Rewards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 neon-text font-retro">
            🎁 Recompensas Disponibles
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎫', name: 'Acceso Anticipado', cost: '1,000 NOVA' },
              { icon: '🖼️', name: 'NFT Exclusivo', cost: '2,500 NOVA' },
              { icon: '🎵', name: 'Beat Premium', cost: '500 NOVA' },
              { icon: '👑', name: 'VIP Status', cost: '5,000 NOVA' },
            ].map((reward) => (
              <motion.div
                key={reward.name}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-dark-700/30 border border-gray-600 rounded-lg p-4"
              >
                <div className="text-3xl mb-2">{reward.icon}</div>
                <div className="text-sm font-semibold text-gray-300">{reward.name}</div>
                <div className="text-xs text-neon-green mt-1">{reward.cost}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}