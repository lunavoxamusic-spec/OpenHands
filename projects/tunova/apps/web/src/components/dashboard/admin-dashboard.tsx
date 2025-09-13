'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  MusicalNoteIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  StarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
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
  AreaChart,
  Area,
} from 'recharts';

interface AdminStats {
  totalUsers: number;
  totalSongs: number;
  totalNFTs: number;
  totalRevenue: number;
  activeUsers: number;
  pendingReports: number;
  systemHealth: number;
  storageUsed: number;
}

interface ContentItem {
  id: string;
  type: 'song' | 'nft' | 'user';
  title: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: Date;
  reports?: number;
}

const mockStats: AdminStats = {
  totalUsers: 47832,
  totalSongs: 12847,
  totalNFTs: 3456,
  totalRevenue: 284756.89,
  activeUsers: 8934,
  pendingReports: 23,
  systemHealth: 98.5,
  storageUsed: 78.3,
};

const mockContent: ContentItem[] = [
  {
    id: '1',
    type: 'song',
    title: 'Neon Dreams',
    author: 'CyberWave',
    status: 'pending',
    uploadDate: new Date('2024-03-01'),
    reports: 0,
  },
  {
    id: '2',
    type: 'nft',
    title: 'Digital Sunset #001',
    author: 'ArtistX',
    status: 'approved',
    uploadDate: new Date('2024-02-28'),
    reports: 2,
  },
  {
    id: '3',
    type: 'user',
    title: 'Reporte de Usuario',
    author: 'UserReport',
    status: 'pending',
    uploadDate: new Date('2024-03-02'),
    reports: 5,
  },
];

const userGrowthData = [
  { name: 'Ene', users: 12000, active: 8500 },
  { name: 'Feb', users: 19000, active: 13200 },
  { name: 'Mar', users: 25000, active: 17800 },
  { name: 'Abr', users: 32000, active: 22400 },
  { name: 'May', users: 41000, active: 28700 },
  { name: 'Jun', users: 47832, active: 33482 },
];

const revenueData = [
  { name: 'Ene', revenue: 45000, fees: 4500 },
  { name: 'Feb', revenue: 67000, fees: 6700 },
  { name: 'Mar', revenue: 89000, fees: 8900 },
  { name: 'Abr', revenue: 123000, fees: 12300 },
  { name: 'May', revenue: 156000, fees: 15600 },
  { name: 'Jun', revenue: 178000, fees: 17800 },
];

const contentTypeData = [
  { name: 'Canciones', value: 65, color: '#81ff8a' },
  { name: 'NFTs', value: 25, color: '#8b5cf6' },
  { name: 'Playlists', value: 8, color: '#06b6d4' },
  { name: 'Otros', value: 2, color: '#f59e0b' },
];

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(mockStats);
  const [content, setContent] = useState<ContentItem[]>(mockContent);
  const [selectedView, setSelectedView] = useState<'overview' | 'content' | 'users' | 'system'>('overview');

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
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'approved':
        return 'text-green-400 bg-green-400/10';
      case 'rejected':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'song':
        return <MusicalNoteIcon className="w-4 h-4" />;
      case 'nft':
        return <StarIcon className="w-4 h-4" />;
      case 'user':
        return <UserGroupIcon className="w-4 h-4" />;
      default:
        return <EyeIcon className="w-4 h-4" />;
    }
  };

  const handleContentAction = (id: string, action: 'approve' | 'reject' | 'delete') => {
    setContent(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : item.status }
        : item
    ));
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
          Panel de Administración 🛡️
        </h1>
        <p className="text-gray-300 text-lg">
          Gestiona la plataforma, modera contenido y supervisa el sistema
        </p>
      </motion.div>

      {/* System Health Alert */}
      {stats.pendingReports > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-center space-x-3"
        >
          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400" />
          <div>
            <div className="font-semibold text-yellow-400">Atención Requerida</div>
            <div className="text-sm text-gray-300">
              Hay {stats.pendingReports} reportes pendientes de revisión
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-auto btn-neon px-4 py-2 text-sm"
          >
            Revisar
          </motion.button>
        </motion.div>
      )}

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
            { key: 'content', label: 'Contenido', icon: MusicalNoteIcon },
            { key: 'users', label: 'Usuarios', icon: UserGroupIcon },
            { key: 'system', label: 'Sistema', icon: Cog6ToothIcon },
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

      {selectedView === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Usuarios Totales',
                value: formatNumber(stats.totalUsers),
                icon: UserGroupIcon,
                color: 'text-blue-400',
                bgColor: 'bg-blue-400/10',
                change: '+12.5%',
              },
              {
                label: 'Contenido Total',
                value: formatNumber(stats.totalSongs + stats.totalNFTs),
                icon: MusicalNoteIcon,
                color: 'text-green-400',
                bgColor: 'bg-green-400/10',
                change: '+8.3%',
              },
              {
                label: 'Ingresos Totales',
                value: formatCurrency(stats.totalRevenue),
                icon: CurrencyDollarIcon,
                color: 'text-yellow-400',
                bgColor: 'bg-yellow-400/10',
                change: '+15.7%',
              },
              {
                label: 'Salud del Sistema',
                value: `${stats.systemHealth}%`,
                icon: ShieldCheckIcon,
                color: 'text-green-400',
                bgColor: 'bg-green-400/10',
                change: '+0.2%',
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
            {/* User Growth */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Crecimiento de Usuarios</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={userGrowthData}>
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
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#81ff8a"
                    fill="#81ff8a"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stackId="2"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Revenue Analytics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6">Análisis de Ingresos</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
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
                  <Bar dataKey="revenue" fill="#81ff8a" />
                  <Bar dataKey="fees" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Content Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-6">Distribución de Contenido</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {contentTypeData.map((entry, index) => (
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
              <div className="space-y-4">
                {contentTypeData.map((type) => (
                  <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-gray-300">{type.name}</span>
                    </div>
                    <span className="text-white font-semibold">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {selectedView === 'content' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Content Management Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Gestión de Contenido</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-neon px-6 py-3 flex items-center space-x-2"
            >
              <CloudArrowUpIcon className="w-5 h-5" />
              <span>Subir Contenido</span>
            </motion.button>
          </div>

          {/* Content List */}
          <div className="glass-card p-6">
            <div className="space-y-4">
              {content.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg hover:bg-dark-700/70 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-dark-600 text-gray-400">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">
                        por {item.author} • {item.uploadDate.toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {item.reports && item.reports > 0 && (
                      <div className="flex items-center space-x-1 text-red-400">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <span className="text-sm">{item.reports}</span>
                      </div>
                    )}
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status === 'pending' ? 'Pendiente' : 
                       item.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleContentAction(item.id, 'approve')}
                        className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                      >
                        <ShieldCheckIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleContentAction(item.id, 'delete')}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {selectedView === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Gestión de Usuarios</h3>
          <div className="text-center text-gray-400 py-12">
            <UserGroupIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Panel de gestión de usuarios en desarrollo</p>
          </div>
        </motion.div>
      )}

      {selectedView === 'system' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* System Health */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Estado del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Salud General</span>
                  <span className="text-green-400 font-semibold">{stats.systemHealth}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.systemHealth}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Almacenamiento</span>
                  <span className="text-yellow-400 font-semibold">{stats.storageUsed}%</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.storageUsed}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="bg-gradient-to-r from-yellow-500 to-orange-400 h-3 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Backup Sistema', icon: ShieldCheckIcon, color: 'bg-green-600' },
              { label: 'Limpiar Cache', icon: Cog6ToothIcon, color: 'bg-blue-600' },
              { label: 'Actualizar BD', icon: ChartBarIcon, color: 'bg-purple-600' },
              { label: 'Logs Sistema', icon: EyeIcon, color: 'bg-orange-600' },
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
          </div>
        </motion.div>
      )}
    </div>
  );
}