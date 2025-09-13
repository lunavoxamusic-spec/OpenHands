'use client';

import React from 'react';
import { PremiumHeroSection } from './components/sections/premium-hero-section';
import './styles/premium-effects.css';

export default function PremiumLandingDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      <PremiumHeroSection />
      
      {/* Additional Sections for Demo */}
      <section id="minigames" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 holographic-text">
            Minijuegos Interactivos
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Experimenta con nuestros juegos Web3 mientras esperas el lanzamiento
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 rounded-2xl hover:neon-green-box transition-all duration-300">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 neon-green">Cassette Collector</h3>
              <p className="text-gray-300">Colecciona cassettes virtuales y gana puntos NOVA</p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover:neon-dark-green-box transition-all duration-300">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold mb-4 neon-dark-green">Beat Creator</h3>
              <p className="text-gray-300">Crea beats de 8 segundos con samples retro</p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl hover:neon-green-box transition-all duration-300">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="text-2xl font-bold mb-4 neon-green">NFT Puzzle</h3>
              <p className="text-gray-300">Resuelve puzzles de covers generadas por IA</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pre-registration" className="py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 holographic-text">
            Únete a la Revolución Web3
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Sé parte de los primeros en experimentar el futuro de la música
          </p>
          
          <div className="max-w-md mx-auto glass-effect p-8 rounded-2xl">
            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full px-4 py-3 bg-black/50 border border-[#81ff8a]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#81ff8a] focus:outline-none focus:ring-2 focus:ring-[#81ff8a]/20"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Wallet Address (opcional)"
                  className="w-full px-4 py-3 bg-black/50 border border-[#81ff8a]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#81ff8a] focus:outline-none focus:ring-2 focus:ring-[#81ff8a]/20"
                />
              </div>
              <button
                type="submit"
                className="w-full liquid-button px-6 py-3 text-black font-bold rounded-lg transition-all duration-300"
              >
                🚀 Pre-registrarme
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="holographic-text text-3xl font-bold mb-4">TUNOVA</div>
          <p className="text-gray-400 mb-6">El Futuro de la Música Web3</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-[#81ff8a] transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-[#81ff8a] transition-colors">
              Discord
            </a>
            <a href="#" className="text-gray-400 hover:text-[#81ff8a] transition-colors">
              Telegram
            </a>
            <a href="#" className="text-gray-400 hover:text-[#81ff8a] transition-colors">
              GitHub
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            © 2024 Tunova. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}