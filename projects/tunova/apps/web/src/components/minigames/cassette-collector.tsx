'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

interface Cassette {
  id: string;
  x: number;
  y: number;
  type: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  collected: boolean;
}

const cassetteTypes = {
  common: { color: '#64748b', points: 10, emoji: '📼' },
  rare: { color: '#3b82f6', points: 25, emoji: '💿' },
  epic: { color: '#8b5cf6', points: 50, emoji: '🎵' },
  legendary: { color: '#f59e0b', points: 100, emoji: '👑' },
};

export function CassetteCollectorGame() {
  // const { address, isConnected } = useAccount();
  const isConnected = false; // Temporary for demo
  const [cassettes, setCassettes] = useState<Cassette[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Generate random cassettes
  const generateCassette = (): Cassette => {
    const types = Object.keys(cassetteTypes) as Array<keyof typeof cassetteTypes>;
    const weights = [70, 20, 8, 2]; // Common, Rare, Epic, Legendary
    
    let random = Math.random() * 100;
    let selectedType: keyof typeof cassetteTypes = 'common';
    
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        selectedType = types[i];
        break;
      }
      random -= weights[i];
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 80 + 10, // 10% to 90% of container height
      type: selectedType,
      points: cassetteTypes[selectedType].points,
      collected: false,
    };
  };

  // Start game
  const startGame = () => {
    if (!isConnected) {
      toast.error('Conecta tu wallet para jugar');
      return;
    }

    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
    setCassettes([]);
    
    // Generate initial cassettes
    const initialCassettes = Array.from({ length: 5 }, generateCassette);
    setCassettes(initialCassettes);
  };

  // End game
  const endGame = () => {
    setGameActive(false);
    if (score > highScore) {
      setHighScore(score);
      toast.success(`¡Nuevo récord! ${score} puntos NOVA`);
    }
    
    // Save score to wallet/backend (simulated)
    if (score > 0) {
      toast.success(`Ganaste ${score} puntos NOVA!`);
    }
  };

  // Collect cassette
  const collectCassette = (cassetteId: string) => {
    setCassettes(prev => 
      prev.map(cassette => 
        cassette.id === cassetteId 
          ? { ...cassette, collected: true }
          : cassette
      )
    );

    const cassette = cassettes.find(c => c.id === cassetteId);
    if (cassette) {
      setScore(prev => prev + cassette.points);
      toast.success(`+${cassette.points} NOVA!`);
      
      // Remove collected cassette after animation
      setTimeout(() => {
        setCassettes(prev => prev.filter(c => c.id !== cassetteId));
        
        // Add new cassette
        if (gameActive) {
          setCassettes(prev => [...prev, generateCassette()]);
        }
      }, 500);
    }
  };

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }

    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

  // Add cassettes periodically
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameActive) {
      interval = setInterval(() => {
        setCassettes(prev => {
          if (prev.length < 8) {
            return [...prev, generateCassette()];
          }
          return prev;
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [gameActive]);

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold neon-text font-retro">
          📼 Cassette Collector
        </h3>
        <p className="text-gray-300">
          Colecciona cassettes virtuales antes de que desaparezcan. 
          ¡Los más raros valen más puntos NOVA!
        </p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold neon-text">{score}</div>
          <div className="text-sm text-gray-400">Puntos Actuales</div>
        </div>
        <div className="bg-dark-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
          <div className="text-sm text-gray-400">Mejor Puntuación</div>
        </div>
        <div className="bg-dark-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{timeLeft}s</div>
          <div className="text-sm text-gray-400">Tiempo Restante</div>
        </div>
        <div className="bg-dark-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{cassettes.length}</div>
          <div className="text-sm text-gray-400">Cassettes Activos</div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative">
        {!gameActive ? (
          <div className="bg-dark-700/30 border-2 border-dashed border-gray-600 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">📼</div>
              <h4 className="text-xl font-semibold text-gray-300">
                ¿Listo para coleccionar?
              </h4>
              <p className="text-gray-400 max-w-md">
                Conecta tu wallet y haz clic en los cassettes para coleccionarlos. 
                Tienes 60 segundos para conseguir la mayor puntuación posible.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="btn-neon px-8 py-3 text-lg"
              >
                {isConnected ? 'Iniciar Juego' : 'Conectar Wallet'}
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-dark-800/50 to-dark-700/50 border border-neon-green/30 rounded-2xl h-96 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(129,255,138,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
            </div>

            {/* Cassettes */}
            <AnimatePresence>
              {cassettes.map((cassette) => (
                <motion.button
                  key={cassette.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: cassette.collected ? 0 : 1, 
                    opacity: cassette.collected ? 0 : 1,
                    rotate: cassette.collected ? 180 : 0,
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => collectCassette(cassette.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-4xl hover:drop-shadow-lg transition-all duration-200"
                  style={{
                    left: `${cassette.x}%`,
                    top: `${cassette.y}%`,
                    filter: `drop-shadow(0 0 10px ${cassetteTypes[cassette.type].color})`,
                  }}
                >
                  {cassetteTypes[cassette.type].emoji}
                  
                  {/* Points indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold px-2 py-1 rounded bg-black/80 text-white whitespace-nowrap"
                    style={{ color: cassetteTypes[cassette.type].color }}
                  >
                    +{cassette.points} NOVA
                  </motion.div>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Game Over Overlay */}
            {!gameActive && score > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 flex items-center justify-center"
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl">🎉</div>
                  <h4 className="text-2xl font-bold neon-text">¡Juego Terminado!</h4>
                  <p className="text-xl">Puntuación Final: <span className="neon-text">{score} NOVA</span></p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="btn-neon px-6 py-3"
                  >
                    Jugar de Nuevo
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Rarity Guide */}
      <div className="bg-dark-700/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4 text-center">Guía de Rareza</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(cassetteTypes).map(([type, info]) => (
            <div key={type} className="text-center space-y-2">
              <div className="text-2xl">{info.emoji}</div>
              <div className="text-sm font-semibold capitalize" style={{ color: info.color }}>
                {type}
              </div>
              <div className="text-xs text-gray-400">+{info.points} NOVA</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}