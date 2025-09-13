'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon, PauseIcon, StopIcon, ShareIcon } from '@heroicons/react/24/solid';
// import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

interface BeatPattern {
  kick: boolean[];
  snare: boolean[];
  hihat: boolean[];
  bass: boolean[];
}

const STEPS = 16;
const BPM = 120;
const STEP_DURATION = (60 / BPM / 4) * 1000; // Duration of each step in ms

const sampleSounds = {
  kick: { name: 'Kick', color: '#ef4444', emoji: '🥁' },
  snare: { name: 'Snare', color: '#f97316', emoji: '🪘' },
  hihat: { name: 'Hi-Hat', color: '#eab308', emoji: '🎵' },
  bass: { name: 'Bass', color: '#8b5cf6', emoji: '🎸' },
};

export function BeatCreatorGame() {
  // const { address, isConnected } = useAccount();
  const isConnected = false; // Temporary for demo
  const [pattern, setPattern] = useState<BeatPattern>({
    kick: new Array(STEPS).fill(false),
    snare: new Array(STEPS).fill(false),
    hihat: new Array(STEPS).fill(false),
    bass: new Array(STEPS).fill(false),
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [savedBeats, setSavedBeats] = useState<string[]>([]);
  const [beatName, setBeatName] = useState('');
  const intervalRef = useRef<NodeJS.Timeout>();

  // Toggle step in pattern
  const toggleStep = (track: keyof BeatPattern, step: number) => {
    setPattern(prev => ({
      ...prev,
      [track]: prev[track].map((active, index) => 
        index === step ? !active : active
      ),
    }));
  };

  // Play/pause beat
  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsPlaying(true);
      setCurrentStep(0);
      
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % STEPS);
      }, STEP_DURATION);
    }
  };

  // Stop playback
  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Clear pattern
  const clearPattern = () => {
    setPattern({
      kick: new Array(STEPS).fill(false),
      snare: new Array(STEPS).fill(false),
      hihat: new Array(STEPS).fill(false),
      bass: new Array(STEPS).fill(false),
    });
    stopPlayback();
  };

  // Save beat
  const saveBeat = () => {
    if (!isConnected) {
      toast.error('Conecta tu wallet para guardar beats');
      return;
    }

    if (!beatName.trim()) {
      toast.error('Ingresa un nombre para tu beat');
      return;
    }

    const beatData = JSON.stringify(pattern);
    setSavedBeats(prev => [...prev, `${beatName}: ${beatData}`]);
    setBeatName('');
    toast.success('Beat guardado exitosamente!');
    
    // Award NOVA points
    toast.success('+50 NOVA por crear un beat!');
  };

  // Share beat
  const shareBeat = () => {
    if (!isConnected) {
      toast.error('Conecta tu wallet para compartir');
      return;
    }

    // Simulate sharing to social media
    toast.success('Beat compartido en redes sociales!');
    toast.success('+25 NOVA por compartir!');
  };

  // Generate random pattern
  const generateRandomPattern = () => {
    const newPattern: BeatPattern = {
      kick: new Array(STEPS).fill(false),
      snare: new Array(STEPS).fill(false),
      hihat: new Array(STEPS).fill(false),
      bass: new Array(STEPS).fill(false),
    };

    // Add some basic patterns
    newPattern.kick[0] = true;
    newPattern.kick[4] = true;
    newPattern.kick[8] = true;
    newPattern.kick[12] = true;

    newPattern.snare[4] = true;
    newPattern.snare[12] = true;

    // Random hi-hats
    for (let i = 0; i < STEPS; i++) {
      if (Math.random() > 0.7) {
        newPattern.hihat[i] = true;
      }
    }

    // Random bass
    for (let i = 0; i < STEPS; i++) {
      if (Math.random() > 0.8) {
        newPattern.bass[i] = true;
      }
    }

    setPattern(newPattern);
    stopPlayback();
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold neon-text font-retro">
          🎵 Beat Creator
        </h3>
        <p className="text-gray-300">
          Crea beats de 8 segundos con samples retro. Comparte tus creaciones 
          y conviértelas en NFTs exclusivos.
        </p>
      </div>

      {/* Sequencer */}
      <div className="bg-dark-700/50 rounded-2xl p-6 border border-neon-green/30">
        <div className="space-y-4">
          {/* Step indicators */}
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Secuenciador (16 pasos)</h4>
            <div className="flex space-x-1">
              {Array.from({ length: STEPS }).map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded border-2 transition-all duration-100 ${
                    currentStep === index && isPlaying
                      ? 'bg-neon-green border-neon-green shadow-neon'
                      : 'border-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Track rows */}
          {Object.entries(sampleSounds).map(([trackKey, trackInfo]) => (
            <div key={trackKey} className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-20 text-sm font-semibold flex items-center space-x-2">
                  <span>{trackInfo.emoji}</span>
                  <span>{trackInfo.name}</span>
                </div>
                <div className="flex space-x-1">
                  {pattern[trackKey as keyof BeatPattern].map((active, stepIndex) => (
                    <motion.button
                      key={stepIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleStep(trackKey as keyof BeatPattern, stepIndex)}
                      className={`w-8 h-8 rounded border-2 transition-all duration-200 ${
                        active
                          ? `bg-opacity-80 border-opacity-100 shadow-lg`
                          : 'bg-dark-600 border-gray-500 hover:border-gray-400'
                      } ${
                        currentStep === stepIndex && isPlaying
                          ? 'ring-2 ring-neon-green'
                          : ''
                      }`}
                      style={{
                        backgroundColor: active ? trackInfo.color : undefined,
                        borderColor: active ? trackInfo.color : undefined,
                        boxShadow: active ? `0 0 10px ${trackInfo.color}` : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayback}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-neon-green hover:bg-neon-green-dark text-dark-950'
          }`}
        >
          {isPlaying ? (
            <>
              <PauseIcon className="w-5 h-5" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5" />
              <span>Reproducir</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={stopPlayback}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
        >
          <StopIcon className="w-5 h-5" />
          <span>Detener</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearPattern}
          className="px-6 py-3 bg-dark-600 hover:bg-dark-500 text-white rounded-lg font-semibold transition-all border border-gray-500"
        >
          Limpiar
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateRandomPattern}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
        >
          Aleatorio
        </motion.button>
      </div>

      {/* Save & Share */}
      <div className="bg-dark-700/30 rounded-xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-center">Guardar y Compartir</h4>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={beatName}
            onChange={(e) => setBeatName(e.target.value)}
            placeholder="Nombre de tu beat..."
            className="input-neon flex-1"
          />
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveBeat}
              disabled={!isConnected}
              className="btn-neon px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Guardar (+50 NOVA)
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareBeat}
              disabled={!isConnected}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShareIcon className="w-5 h-5" />
              <span>Compartir (+25 NOVA)</span>
            </motion.button>
          </div>
        </div>

        {!isConnected && (
          <p className="text-center text-yellow-400 text-sm">
            Conecta tu wallet para guardar y compartir beats
          </p>
        )}
      </div>

      {/* Saved Beats */}
      {savedBeats.length > 0 && (
        <div className="bg-dark-700/30 rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Tus Beats Guardados</h4>
          <div className="space-y-2">
            {savedBeats.slice(-5).map((beat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between bg-dark-600/50 rounded-lg p-3"
              >
                <span className="text-sm text-gray-300">
                  {beat.split(':')[0]}
                </span>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded">
                    Cargar
                  </button>
                  <button className="text-xs px-3 py-1 bg-purple-600/20 text-purple-400 rounded">
                    NFT
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Community Beats */}
      <div className="bg-dark-700/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4 text-center">🔥 Beats Populares</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Retro Vibes', author: 'CryptoBeats', votes: 142 },
            { name: 'Neon Dreams', author: 'SynthWave', votes: 98 },
            { name: 'Digital Funk', author: 'RetroMaster', votes: 87 },
            { name: 'Cyber Groove', author: 'NovaProducer', votes: 76 },
          ].map((beat, index) => (
            <motion.div
              key={beat.name}
              whileHover={{ scale: 1.02 }}
              className="bg-dark-600/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-neon-green">{beat.name}</div>
                <div className="text-sm text-gray-400">por {beat.author}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{beat.votes} votos</div>
                <button className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded mt-1">
                  Votar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}