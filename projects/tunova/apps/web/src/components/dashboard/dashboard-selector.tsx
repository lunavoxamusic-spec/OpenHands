'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { FanDashboard } from './fan-dashboard';
import { ArtistDashboard } from './artist-dashboard';
import { ProducerDashboard } from './producer-dashboard';
import { AdminDashboard } from './admin-dashboard';
import {
  MusicalNoteIcon,
  MicrophoneIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

type UserRole = 'FAN' | 'ARTIST' | 'PRODUCER' | 'ADMIN';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const roleOptions: RoleOption[] = [
  {
    role: 'FAN',
    title: 'Fan',
    description: 'Descubre música, colecciona NFTs y conecta con artistas',
    icon: MusicalNoteIcon,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10 hover:bg-blue-400/20',
  },
  {
    role: 'ARTIST',
    title: 'Artista',
    description: 'Sube tu música, gestiona tu audiencia y monetiza tu arte',
    icon: MicrophoneIcon,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10 hover:bg-purple-400/20',
  },
  {
    role: 'PRODUCER',
    title: 'Productor',
    description: 'Vende beats, colabora con artistas y construye tu red',
    icon: Cog6ToothIcon,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10 hover:bg-green-400/20',
  },
  {
    role: 'ADMIN',
    title: 'Administrador',
    description: 'Gestiona la plataforma y modera contenido',
    icon: ShieldCheckIcon,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10 hover:bg-red-400/20',
  },
];

export function DashboardSelector() {
  const { data: session } = useSession();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(
    (session?.user as any)?.role || null
  );

  // If user is not authenticated, show login prompt
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md"
        >
          <UserIcon className="w-16 h-16 mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold mb-4 neon-text font-retro">
            Acceso Requerido
          </h2>
          <p className="text-gray-300 mb-8">
            Inicia sesión para acceder a tu dashboard personalizado
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-neon px-8 py-3 font-semibold"
          >
            Iniciar Sesión
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // If no role is selected, show role selector
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 p-4">
        <div className="max-w-6xl mx-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold neon-text font-retro mb-4">
              ¡Bienvenido a Tunova!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Selecciona tu rol para acceder a tu dashboard personalizado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleOptions.map((option, index) => (
              <motion.button
                key={option.role}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(option.role)}
                className={`glass-card p-8 text-center transition-all duration-300 ${option.bgColor} border-2 border-transparent hover:border-neon-green/30`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-dark-700 flex items-center justify-center ${option.color}`}>
                  <option.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-retro">
                  {option.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {option.description}
                </p>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 text-sm">
              ¿No estás seguro? Puedes cambiar tu rol en cualquier momento desde la configuración
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on selected role
  const renderDashboard = () => {
    switch (selectedRole) {
      case 'FAN':
        return <FanDashboard />;
      case 'ARTIST':
        return <ArtistDashboard />;
      case 'PRODUCER':
        return <ProducerDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return <FanDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Dashboard Header */}
      <div className="border-b border-gray-800 bg-dark-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {roleOptions.map((option) => (
                  option.role === selectedRole && (
                    <div key={option.role} className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center ${option.color}`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Dashboard</div>
                        <div className="font-semibold text-white">{option.title}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(null)}
                className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Cambiar Rol
              </motion.button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-blue-400 flex items-center justify-center text-dark-950 font-bold text-sm">
                  {session.user?.name?.[0] || 'U'}
                </div>
                <div className="text-sm">
                  <div className="text-white font-medium">{session.user?.name}</div>
                  <div className="text-gray-400">{session.user?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </div>
    </div>
  );
}