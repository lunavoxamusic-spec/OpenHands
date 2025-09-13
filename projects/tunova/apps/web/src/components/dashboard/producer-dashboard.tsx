'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MusicalNoteIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  HandshakeIcon,
  StarIcon,
  PlayIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ProducerStats {
  totalBeats: number;
  beatsSold: number;
  totalEarnings: number;
  activeCollaborations: number;
  averageRating: number;
  topGenre: string;
  monthlyDownloads: number;
  royaltyEarnings: number;
}

interface Beat {
  id: string;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  price: number;
  sales: number;
  likes: number;
  uploadDate: Date;
  status: 'available' | 'sold' | 'exclusive';
}

const mockStats: ProducerStats = {
  totalBeats: 147,
  beatsSold: 89,
  totalEarnings: 12847.65,
  activeCollaborations: 23,
  averageRating: 4.8,
  topGenre: 'Trap',
  monthlyDownloads: 1247,
  royaltyEarnings: 3247.89,
};

const mockBeats: Beat[] = [
  {
    id: '1',
    title: 'Dark Trap Vibes',
    genre: 'Trap',
    bpm: 140,
    key: 'Am',
    price: 49.99,
    sales: 23,
    likes: 156,
    uploadDate: new Date('2024-01-15'),
    status: 'available',
  },
  {
    id: '2',
    title: 'Melodic House Flow',
    genre: 'House',
    bpm: 128,
    key: 'Cm',
    price: 39.99,
    sales: 18,
    likes: 134,
    uploadDate: new Date('2024-02-01'),
    status: 'available',
  },
  {
    id: '3',
    title: 'Future Bass Energy',
    genre: 'Future Bass',
    bpm: 150,
    key: 'F#m',
    price: 59.99,
    sales: 31,
    likes: 201,
    uploadDate: new Date('2024-02-15'),
    status: 'exclusive',
  },
];

const salesData = [
  { name: 'Ene', beats: 12, earnings: 580 },
  { name: 'Feb', beats: 19, earnings: 920 },
  { name: 'Mar', beats: 15, earnings: 750 },
  { name: 'Abr', beats: 27, earnings: 1340 },
  { name: 'May', beats: 32, earnings: 1580 },
  { name: 'Jun', beats: 28, earnings: 1420 },
];

const genreData = [
  { name: 'Trap', value: 40, color: '#81ff8a' },
  { name: 'Hip Hop', value: 25, color: '#8b5cf6' },
  { name: 'House', value: 20, color: '#06b6d4' },
  { name: 'Future Bass', value: 10, color: '#f59e0b' },
  { name: 'Otros', value: 5, color: '#ef4444' },
];

export function ProducerDashboard() {
  const [stats, setStats] = useState<ProducerStats>(mockStats);
  const [beats, setBeats] = useState<Beat[]>(mockBeats);
  const [selectedView, setSelectedView] = useState<'overview' | 'beats' | 'collaborations'>('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-400 bg-green-400/10';
      case 'sold':
        return 'text-blue-400 bg-blue-400/10';
      case 'exclusive':
        return 'text-purple-400 bg-purple-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'sold':
        return 'Vendido';
      case 'exclusive':
        return 'Exclusivo';
      default:
        return status;
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
          ¡Bienvenido, Productor! 🎛️
        </h1>
        <p className="text-gray-300 text-lg">
          Gestiona tus beats, colabora con artistas y maximiza tus ingresos
        </p>
      </motion.div>

      {/* View Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <div className="bg-dark-800/50 backdrop-blur-md border border-gray-600 rounded-xl p-2">
          {[
            { key: 'overview', label: 'Resumen', icon: ChartBarIcon },
            { key: 'beats', label: 'Mis Beats', icon: MusicalNoteIcon },
            { key: 'collaborations', label: 'Colaboraciones', icon: HandshakeIcon },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedView(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                selectedView === tab.key
                  ? 'bg-neon-green text-dark-950'
                  : 'text-gray-300 hover:text-neon-green'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Subir Beat', icon: CloudArrowUpIcon, color: 'bg-blue-600' },
          { label: 'Crear Pack', icon: MusicalNoteIcon, color: 'bg-purple-600' },
          { label: 'Buscar Colaboración', icon: HandshakeIcon, color: 'bg-green-600' },
          { label: 'Configurar Precios', icon: Cog6ToothIcon, color: 'bg-orange-600' },
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

      {selectedView === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Beats Totales',
                value: stats.totalBeats.toString(),
                icon: MusicalNoteIcon,
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10',
                change: '+12',
              },
              {
                label: 'Beats Vendidos',
                value: stats.beatsSold.toString(),
                icon: CurrencyDollarIcon,
                color: 'text-green-400',
                bgColor: 'bg-green-400/10',
                change: '+8',
              },
              {
                label: 'Ingresos Totales',
                value: formatCurrency(stats.totalEarnings),
                icon: CurrencyDollarIcon,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-400/10',
                change: '+15.7%',
              },
              {
                label: 'Colaboraciones',
                value: stats.activeCollaborations.toString(),
                icon: HandshakeIcon,
                color: 'text-purple-400',
                bgColor: 'bg-purple-400/10',
                change: '+5',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="glass-card p-6 text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                <div className="text-xs text-green-400">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Rendimiento de Ventas</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis yAxisId="left" stroke="#9ca3af" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar yAxisId="left" dataKey="beats" fill="#81ff8a" />
                  <Bar yAxisId="right" dataKey="earnings" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Genre Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Distribución por Género</h3>
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
                    <span className="text-sm text-gray-500">{genre.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Revenue Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-6">Desglose de Ingresos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  source: 'Ventas Directas',
                  amount: 7847.32,
                  percentage: 61.1,
                  color: 'bg-blue-500',
                  icon: CurrencyDollarIcon,
                },
                {
                  source: 'Royalties',
                  amount: 3247.89,
                  percentage: 25.3,
                  color: 'bg-green-500',
                  icon: StarIcon,
                },
                {
                  source: 'Colaboraciones',
                  amount: 1752.44,
                  percentage: 13.6,
                  color: 'bg-purple-500',
                  icon: HandshakeIcon,
                },
              ].map((revenue, index) => (
                <motion.div
                  key={revenue.source}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${revenue.color} flex items-center justify-center`}>
                    <revenue.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(revenue.amount)}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">{revenue.source}</div>
                  <div className="text-xs text-gray-500">{revenue.percentage}% del total</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {selectedView === 'beats' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Mis Beats</h3>
          <div className="space-y-4">
            {beats.map((beat, index) => (
              <motion.div
                key={beat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  <PlayIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{beat.title}</div>
                  <div className="text-sm text-gray-400">
                    {beat.genre} • {beat.bpm} BPM • {beat.key}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{formatCurrency(beat.price)}</div>
                  <div className="text-sm text-gray-400">{beat.sales} ventas</div>
                </div>
                <div className="flex items-center space-x-2">
                  <HeartIcon className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{beat.likes}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(beat.status)}`}>
                  {getStatusText(beat.status)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedView === 'collaborations' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Active Collaborations */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Colaboraciones Activas</h3>
            <div className="space-y-4">
              {[
                {
                  artist: 'MC Flow',
                  project: 'Nuevo Álbum',
                  status: 'En progreso',
                  deadline: '15 Mar 2024',
                  payment: '€500',
                },
                {
                  artist: 'Luna Beats',
                  project: 'Single Colaborativo',
                  status: 'Revisión',
                  deadline: '22 Mar 2024',
                  payment: '€300',
                },
                {
                  artist: 'Urban Sound',
                  project: 'EP Completo',
                  status: 'Iniciando',
                  deadline: '30 Mar 2024',
                  payment: '€800',
                },
              ].map((collab, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-white">{collab.artist}</div>
                    <div className="text-sm text-gray-400">{collab.project}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-300">{collab.status}</div>
                    <div className="text-xs text-gray-500">{collab.deadline}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">{collab.payment}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Collaboration Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Proyectos Completados', value: '47', icon: HandshakeIcon },
              { label: 'Rating Promedio', value: '4.8/5', icon: StarIcon },
              { label: 'Tiempo Respuesta', value: '2.3h', icon: Cog6ToothIcon },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-400/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}