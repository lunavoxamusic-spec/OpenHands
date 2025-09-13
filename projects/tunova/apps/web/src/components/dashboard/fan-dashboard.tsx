'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MusicalNoteIcon,
  HeartIcon,
  PlayIcon,
  TrophyIcon,
  UserGroupIcon,
  ChartBarIcon,
  StarIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface FanStats {
  totalListeningTime: number;
  songsPlayed: number;
  artistsFollowed: number;
  nftsOwned: number;
  novaPoints: number;
  level: number;
  streakDays: number;
  favoriteGenre: string;
}

interface RecentActivity {
  id: string;
  type: 'play' | 'like' | 'follow' | 'purchase';
  title: string;
  artist: string;
  timestamp: Date;
  image: string;
}

const mockStats: FanStats = {
  totalListeningTime: 1247, // minutes
  songsPlayed: 342,
  artistsFollowed: 28,
  nftsOwned: 15,
  novaPoints: 2847,
  level: 12,
  streakDays: 7,
  favoriteGenre: 'Electronic',
};

const mockActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'play',
    title: 'Neon Dreams',
    artist: 'CyberWave',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    image: '/api/placeholder/50/50',
  },
  {
    id: '2',
    type: 'like',
    title: 'Digital Sunset',
    artist: 'RetroFuture',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    image: '/api/placeholder/50/50',
  },
  {
    id: '3',
    type: 'follow',
    title: 'SynthMaster',
    artist: 'SynthMaster',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    image: '/api/placeholder/50/50',
  },
];

const listeningData = [
  { name: 'Lun', minutes: 45 },
  { name: 'Mar', minutes: 67 },
  { name: 'Mié', minutes: 89 },
  { name: 'Jue', minutes: 123 },
  { name: 'Vie', minutes: 156 },
  { name: 'Sáb', minutes: 201 },
  { name: 'Dom', minutes: 178 },
];

const genreData = [
  { name: 'Electronic', value: 35, color: '#81ff8a' },
  { name: 'Synthwave', value: 25, color: '#8b5cf6' },
  { name: 'Ambient', value: 20, color: '#06b6d4' },
  { name: 'House', value: 15, color: '#f59e0b' },
  { name: 'Otros', value: 5, color: '#ef4444' },
];

export function FanDashboard() {
  const [stats, setStats] = useState<FanStats>(mockStats);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(mockActivity);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'play':
        return <PlayIcon className="w-4 h-4" />;
      case 'like':
        return <HeartIcon className="w-4 h-4" />;
      case 'follow':
        return <UserGroupIcon className="w-4 h-4" />;
      case 'purchase':
        return <GiftIcon className="w-4 h-4" />;
      default:
        return <MusicalNoteIcon className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'play':
        return 'text-blue-400';
      case 'like':
        return 'text-red-400';
      case 'follow':
        return 'text-green-400';
      case 'purchase':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold neon-text font-retro">
          ¡Bienvenido de vuelta, Fan! 🎵
        </h1>
        <p className="text-gray-300 text-lg">
          Descubre nueva música, colecciona NFTs y conecta con tus artistas favoritos
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Tiempo de Escucha',
            value: formatTime(stats.totalListeningTime),
            icon: MusicalNoteIcon,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
          },
          {
            label: 'Canciones Reproducidas',
            value: stats.songsPlayed.toLocaleString(),
            icon: PlayIcon,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
          },
          {
            label: 'NFTs Coleccionados',
            value: stats.nftsOwned.toString(),
            icon: StarIcon,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
          },
          {
            label: 'Puntos NOVA',
            value: stats.novaPoints.toLocaleString(),
            icon: TrophyIcon,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Progreso de Nivel</h3>
          <div className="flex items-center space-x-2">
            <TrophyIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Nivel {stats.level}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Experiencia: 2,847 / 3,000</span>
            <span>153 XP para el siguiente nivel</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '94.9%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-neon-green to-blue-400 h-3 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Listening Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Actividad de Escucha (7 días)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={listeningData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="#81ff8a"
                strokeWidth={3}
                dot={{ fill: '#81ff8a', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Genre Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Géneros Favoritos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {genreData.map((genre) => (
              <div key={genre.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: genre.color }}
                />
                <span className="text-sm text-gray-300">{genre.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Actividad Reciente</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
            >
              <div className={`p-2 rounded-full bg-dark-600 ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {activity.title[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{activity.title}</div>
                <div className="text-sm text-gray-400">{activity.artist}</div>
              </div>
              <div className="text-sm text-gray-500">
                {activity.timestamp.toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Descubrir Música', icon: MusicalNoteIcon, color: 'bg-blue-600' },
          { label: 'Marketplace NFT', icon: StarIcon, color: 'bg-purple-600' },
          { label: 'Mini-juegos', icon: TrophyIcon, color: 'bg-green-600' },
          { label: 'Comunidad', icon: UserGroupIcon, color: 'bg-pink-600' },
        ].map((action, index) => (
          <motion.button
            key={action.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${action.color} hover:opacity-90 text-white p-4 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center space-y-2`}
          >
            <action.icon className="w-6 h-6" />
            <span className="text-sm">{action.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}