'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MusicalNoteIcon,
  PlayIcon,
  HeartIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  StarIcon,
  EyeIcon,
  ShareIcon,
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

interface ArtistStats {
  totalStreams: number;
  monthlyListeners: number;
  followers: number;
  totalEarnings: number;
  songsUploaded: number;
  nftsSold: number;
  averageRating: number;
  topCountry: string;
}

interface Song {
  id: string;
  title: string;
  streams: number;
  likes: number;
  earnings: number;
  uploadDate: Date;
  genre: string;
}

const mockStats: ArtistStats = {
  totalStreams: 1247832,
  monthlyListeners: 45672,
  followers: 12847,
  totalEarnings: 8947.32,
  songsUploaded: 23,
  nftsSold: 156,
  averageRating: 4.7,
  topCountry: 'España',
};

const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    streams: 234567,
    likes: 12847,
    earnings: 1247.32,
    uploadDate: new Date('2024-01-15'),
    genre: 'Electronic',
  },
  {
    id: '2',
    title: 'Digital Sunset',
    streams: 189432,
    likes: 9876,
    earnings: 987.65,
    uploadDate: new Date('2024-02-01'),
    genre: 'Synthwave',
  },
  {
    id: '3',
    title: 'Cyber Groove',
    streams: 156789,
    likes: 8765,
    earnings: 823.45,
    uploadDate: new Date('2024-02-15'),
    genre: 'House',
  },
];

const streamingData = [
  { name: 'Ene', streams: 12000, earnings: 640 },
  { name: 'Feb', streams: 19000, earnings: 1020 },
  { name: 'Mar', streams: 15000, earnings: 800 },
  { name: 'Abr', streams: 27000, earnings: 1440 },
  { name: 'May', streams: 32000, earnings: 1710 },
  { name: 'Jun', streams: 28000, earnings: 1500 },
];

const demographicData = [
  { name: 'España', value: 35, color: '#81ff8a' },
  { name: 'México', value: 25, color: '#8b5cf6' },
  { name: 'Argentina', value: 20, color: '#06b6d4' },
  { name: 'Colombia', value: 15, color: '#f59e0b' },
  { name: 'Otros', value: 5, color: '#ef4444' },
];

export function ArtistDashboard() {
  const [stats, setStats] = useState<ArtistStats>(mockStats);
  const [songs, setSongs] = useState<Song[]>(mockSongs);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

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

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold neon-text font-retro">
          ¡Bienvenido, Artista! 🎤
        </h1>
        <p className="text-gray-300 text-lg">
          Gestiona tu música, analiza tu audiencia y maximiza tus ingresos
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Subir Canción', icon: CloudArrowUpIcon, color: 'bg-blue-600' },
          { label: 'Crear NFT', icon: StarIcon, color: 'bg-purple-600' },
          { label: 'Ver Analytics', icon: ChartBarIcon, color: 'bg-green-600' },
          { label: 'Promocionar', icon: ShareIcon, color: 'bg-pink-600' },
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Reproducciones Totales',
            value: formatNumber(stats.totalStreams),
            icon: PlayIcon,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
            change: '+12.5%',
          },
          {
            label: 'Oyentes Mensuales',
            value: formatNumber(stats.monthlyListeners),
            icon: UserGroupIcon,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
            change: '+8.3%',
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
            label: 'NFTs Vendidos',
            value: stats.nftsSold.toString(),
            icon: StarIcon,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
            change: '+23.1%',
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
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
        {/* Streaming & Earnings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Reproducciones e Ingresos</h3>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="bg-dark-700 border border-gray-600 rounded-lg px-3 py-1 text-sm"
            >
              <option value="7d">7 días</option>
              <option value="30d">30 días</option>
              <option value="90d">90 días</option>
              <option value="1y">1 año</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={streamingData}>
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
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="streams"
                stroke="#81ff8a"
                strokeWidth={3}
                dot={{ fill: '#81ff8a', strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="earnings"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Distribución Geográfica</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={demographicData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {demographicData.map((entry, index) => (
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
            {demographicData.map((country) => (
              <div key={country.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: country.color }}
                />
                <span className="text-sm text-gray-300">{country.name}</span>
                <span className="text-sm text-gray-500">{country.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Songs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Canciones Más Populares</h3>
        <div className="space-y-4">
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
            >
              <div className="text-2xl font-bold text-gray-500 w-8">
                #{index + 1}
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {song.title[0]}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white">{song.title}</div>
                <div className="text-sm text-gray-400">{song.genre}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <PlayIcon className="w-4 h-4 text-blue-400" />
                    <span>{formatNumber(song.streams)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HeartIcon className="w-4 h-4 text-red-400" />
                    <span>{formatNumber(song.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CurrencyDollarIcon className="w-4 h-4 text-yellow-400" />
                    <span>{formatCurrency(song.earnings)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Desglose de Ingresos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              source: 'Streaming',
              amount: 5247.32,
              percentage: 58.6,
              color: 'bg-blue-500',
              icon: PlayIcon,
            },
            {
              source: 'NFT Sales',
              amount: 2847.65,
              percentage: 31.8,
              color: 'bg-purple-500',
              icon: StarIcon,
            },
            {
              source: 'Tips & Donations',
              amount: 852.35,
              percentage: 9.6,
              color: 'bg-green-500',
              icon: CurrencyDollarIcon,
            },
          ].map((revenue, index) => (
            <motion.div
              key={revenue.source}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
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

      {/* Fan Engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Engagement de Fans</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Seguidores', value: formatNumber(stats.followers), change: '+5.2%' },
            { label: 'Rating Promedio', value: `${stats.averageRating}/5`, change: '+0.1' },
            { label: 'Comentarios', value: '1.2K', change: '+18.7%' },
            { label: 'Compartidos', value: '847', change: '+12.3%' },
          ].map((metric, index) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
              <div className="text-xs text-green-400">{metric.change}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}