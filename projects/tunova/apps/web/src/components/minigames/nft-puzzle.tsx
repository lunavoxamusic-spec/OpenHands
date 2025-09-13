'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowPathIcon, ArrowDownTrayIcon, TrophyIcon } from '@heroicons/react/24/outline';
// import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  isEmpty?: boolean;
}

const PUZZLE_SIZES = {
  easy: { size: 3, name: 'Fácil (3x3)', reward: 25 },
  medium: { size: 4, name: 'Medio (4x4)', reward: 50 },
  hard: { size: 5, name: 'Difícil (5x5)', reward: 100 },
};

const SAMPLE_COVERS = [
  {
    id: 1,
    name: 'Neon Dreams',
    artist: 'AI Generated',
    image: '/api/placeholder/300/300',
    style: 'Synthwave',
  },
  {
    id: 2,
    name: 'Cyber Funk',
    artist: 'AI Generated',
    image: '/api/placeholder/300/300',
    style: 'Cyberpunk',
  },
  {
    id: 3,
    name: 'Retro Vibes',
    artist: 'AI Generated',
    image: '/api/placeholder/300/300',
    style: 'Vaporwave',
  },
];

export function NFTPuzzleGame() {
  // const { address, isConnected } = useAccount();
  const isConnected = false; // Temporary for demo
  const [difficulty, setDifficulty] = useState<keyof typeof PUZZLE_SIZES>('easy');
  const [currentCover, setCurrentCover] = useState(SAMPLE_COVERS[0]);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [completionTime, setCompletionTime] = useState<number>(0);

  const puzzleSize = PUZZLE_SIZES[difficulty].size;
  const totalPieces = puzzleSize * puzzleSize;

  // Initialize puzzle
  const initializePuzzle = () => {
    const newPieces: PuzzlePiece[] = [];
    
    for (let i = 0; i < totalPieces - 1; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
      });
    }
    
    // Add empty space
    newPieces.push({
      id: totalPieces - 1,
      currentPosition: totalPieces - 1,
      correctPosition: totalPieces - 1,
      isEmpty: true,
    });

    setPieces(newPieces);
  };

  // Shuffle puzzle
  const shufflePuzzle = () => {
    const shuffledPieces = [...pieces];
    
    // Perform random valid moves to ensure solvability
    for (let i = 0; i < 1000; i++) {
      const emptyPiece = shuffledPieces.find(p => p.isEmpty);
      if (!emptyPiece) continue;
      
      const emptyPos = emptyPiece.currentPosition;
      const row = Math.floor(emptyPos / puzzleSize);
      const col = emptyPos % puzzleSize;
      
      const possibleMoves = [];
      if (row > 0) possibleMoves.push(emptyPos - puzzleSize); // Up
      if (row < puzzleSize - 1) possibleMoves.push(emptyPos + puzzleSize); // Down
      if (col > 0) possibleMoves.push(emptyPos - 1); // Left
      if (col < puzzleSize - 1) possibleMoves.push(emptyPos + 1); // Right
      
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        const pieceToMove = shuffledPieces.find(p => p.currentPosition === randomMove);
        
        if (pieceToMove) {
          pieceToMove.currentPosition = emptyPos;
          emptyPiece.currentPosition = randomMove;
        }
      }
    }
    
    setPieces(shuffledPieces);
  };

  // Start game
  const startGame = () => {
    if (!isConnected) {
      toast.error('Conecta tu wallet para jugar');
      return;
    }

    initializePuzzle();
    setTimeout(() => {
      shufflePuzzle();
      setGameStarted(true);
      setGameCompleted(false);
      setMoves(0);
      setStartTime(Date.now());
    }, 100);
  };

  // Move piece
  const movePiece = (pieceId: number) => {
    if (!gameStarted || gameCompleted) return;

    const piece = pieces.find(p => p.id === pieceId);
    const emptyPiece = pieces.find(p => p.isEmpty);
    
    if (!piece || !emptyPiece) return;

    const piecePos = piece.currentPosition;
    const emptyPos = emptyPiece.currentPosition;
    
    const pieceRow = Math.floor(piecePos / puzzleSize);
    const pieceCol = piecePos % puzzleSize;
    const emptyRow = Math.floor(emptyPos / puzzleSize);
    const emptyCol = emptyPos % puzzleSize;
    
    // Check if move is valid (adjacent to empty space)
    const isAdjacent = 
      (Math.abs(pieceRow - emptyRow) === 1 && pieceCol === emptyCol) ||
      (Math.abs(pieceCol - emptyCol) === 1 && pieceRow === emptyRow);
    
    if (!isAdjacent) return;

    // Swap positions
    const newPieces = pieces.map(p => {
      if (p.id === pieceId) {
        return { ...p, currentPosition: emptyPos };
      }
      if (p.isEmpty) {
        return { ...p, currentPosition: piecePos };
      }
      return p;
    });

    setPieces(newPieces);
    setMoves(prev => prev + 1);

    // Check if puzzle is solved
    const isSolved = newPieces.every(p => p.currentPosition === p.correctPosition);
    if (isSolved) {
      setGameCompleted(true);
      setCompletionTime(Date.now() - startTime);
      const reward = PUZZLE_SIZES[difficulty].reward;
      toast.success(`¡Puzzle completado! +${reward} NOVA`);
    }
  };

  // Change cover
  const changeCover = () => {
    const currentIndex = SAMPLE_COVERS.findIndex(c => c.id === currentCover.id);
    const nextIndex = (currentIndex + 1) % SAMPLE_COVERS.length;
    setCurrentCover(SAMPLE_COVERS[nextIndex]);
    
    if (gameStarted) {
      setGameStarted(false);
      setGameCompleted(false);
    }
  };

  // Download wallpaper
  const downloadWallpaper = () => {
    if (!gameCompleted) {
      toast.error('Completa el puzzle para descargar el wallpaper');
      return;
    }
    
    toast.success('Wallpaper descargado!');
    toast.success('+10 NOVA por descargar!');
  };

  // Initialize on mount
  useEffect(() => {
    initializePuzzle();
  }, [difficulty]);

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold neon-text font-retro">
          🧩 NFT Puzzle
        </h3>
        <p className="text-gray-300">
          Resuelve puzzles de covers musicales generadas por IA. 
          Completa el puzzle para descargar el artwork como wallpaper.
        </p>
      </div>

      {/* Game Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as keyof typeof PUZZLE_SIZES)}
          disabled={gameStarted}
          className="input-neon px-4 py-2 rounded-lg"
        >
          {Object.entries(PUZZLE_SIZES).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name} - {config.reward} NOVA
            </option>
          ))}
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={changeCover}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <span>Cambiar Cover</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          disabled={!isConnected}
          className="btn-neon px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {gameStarted ? 'Reiniciar' : 'Iniciar Puzzle'}
        </motion.button>
      </div>

      {/* Game Stats */}
      {gameStarted && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold neon-text">{moves}</div>
            <div className="text-sm text-gray-400">Movimientos</div>
          </div>
          <div className="bg-dark-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.floor((Date.now() - startTime) / 1000)}s
            </div>
            <div className="text-sm text-gray-400">Tiempo</div>
          </div>
          <div className="bg-dark-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{PUZZLE_SIZES[difficulty].reward}</div>
            <div className="text-sm text-gray-400">NOVA Reward</div>
          </div>
          <div className="bg-dark-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{difficulty.toUpperCase()}</div>
            <div className="text-sm text-gray-400">Dificultad</div>
          </div>
        </div>
      )}

      {/* Current Cover Info */}
      <div className="bg-dark-700/30 rounded-xl p-6 text-center">
        <h4 className="text-xl font-semibold mb-2 neon-text">{currentCover.name}</h4>
        <p className="text-gray-400 mb-1">por {currentCover.artist}</p>
        <p className="text-sm text-purple-400">Estilo: {currentCover.style}</p>
      </div>

      {/* Puzzle Grid */}
      <div className="flex justify-center">
        <div 
          className="grid gap-1 bg-dark-800 p-4 rounded-2xl border border-neon-green/30"
          style={{ 
            gridTemplateColumns: `repeat(${puzzleSize}, 1fr)`,
            width: 'fit-content',
          }}
        >
          {pieces
            .sort((a, b) => a.currentPosition - b.currentPosition)
            .map((piece) => (
              <motion.div
                key={piece.id}
                layout
                whileHover={!piece.isEmpty ? { scale: 1.05 } : {}}
                whileTap={!piece.isEmpty ? { scale: 0.95 } : {}}
                onClick={() => !piece.isEmpty && movePiece(piece.id)}
                className={`
                  relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200
                  ${piece.isEmpty 
                    ? 'bg-dark-600 border-2 border-dashed border-gray-500' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-gray-400 hover:border-neon-green'
                  }
                `}
                style={{
                  width: `${300 / puzzleSize}px`,
                  height: `${300 / puzzleSize}px`,
                }}
              >
                {!piece.isEmpty && (
                  <>
                    {/* Piece background with cover art simulation */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-80"
                      style={{
                        backgroundImage: `linear-gradient(${piece.id * 45}deg, #8b5cf6, #ec4899, #06b6d4)`,
                      }}
                    />
                    
                    {/* Piece number */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg drop-shadow-lg">
                        {piece.id + 1}
                      </span>
                    </div>
                    
                    {/* Correct position indicator */}
                    {piece.currentPosition === piece.correctPosition && (
                      <div className="absolute top-1 right-1 w-3 h-3 bg-neon-green rounded-full shadow-neon" />
                    )}
                  </>
                )}
              </motion.div>
            ))}
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setGameCompleted(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-800 border border-neon-green rounded-2xl p-8 max-w-md mx-4 text-center space-y-6"
            >
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold neon-text">¡Puzzle Completado!</h3>
              
              <div className="space-y-2">
                <p className="text-gray-300">
                  Tiempo: <span className="text-neon-green">{Math.floor(completionTime / 1000)}s</span>
                </p>
                <p className="text-gray-300">
                  Movimientos: <span className="text-neon-green">{moves}</span>
                </p>
                <p className="text-gray-300">
                  Recompensa: <span className="text-neon-green">+{PUZZLE_SIZES[difficulty].reward} NOVA</span>
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadWallpaper}
                  className="flex items-center justify-center space-x-2 btn-neon px-6 py-3"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Descargar Wallpaper (+10 NOVA)</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                >
                  Jugar de Nuevo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievements */}
      <div className="bg-dark-700/30 rounded-xl p-6">
        <h4 className="text-lg font-semibold mb-4 text-center flex items-center justify-center space-x-2">
          <TrophyIcon className="w-6 h-6 text-yellow-400" />
          <span>Logros del Puzzle</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Primer Puzzle', desc: 'Completa tu primer puzzle', reward: '25 NOVA', unlocked: true },
            { name: 'Velocista', desc: 'Completa un puzzle en menos de 60s', reward: '50 NOVA', unlocked: false },
            { name: 'Maestro del Puzzle', desc: 'Completa 10 puzzles', reward: '100 NOVA', unlocked: false },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`p-4 rounded-lg border ${
                achievement.unlocked
                  ? 'bg-neon-green/10 border-neon-green text-neon-green'
                  : 'bg-dark-600/50 border-gray-600 text-gray-400'
              }`}
            >
              <div className="font-semibold">{achievement.name}</div>
              <div className="text-sm opacity-75">{achievement.desc}</div>
              <div className="text-xs mt-1">{achievement.reward}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}