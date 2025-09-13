'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShareIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  HandRaisedIcon,
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
import { toast } from 'react-hot-toast';

interface AffiliateStats {
  totalEarnings: number;
  pendingEarnings: number;
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  clicksThisMonth: number;
  commissionsThisMonth: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

interface ReferralLink {
  id: string;
  name: string;
  url: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: Date;
  isActive: boolean;
}

const mockStats: AffiliateStats = {
  totalEarnings: 2847.65,
  pendingEarnings: 456.32,
  totalReferrals: 127,
  activeReferrals: 89,
  conversionRate: 12.5,
  clicksThisMonth: 1247,
  commissionsThisMonth: 8,
  tier: 'Gold',
};

const mockLinks: ReferralLink[] = [
  {
    id: '1',
    name: 'Link Principal',
    url: 'https://tunova.io?ref=USER123',
    clicks: 456,
    conversions: 23,
    earnings: 1247.32,
    createdAt: new Date('2024-01-15'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Campaña Twitter',
    url: 'https://tunova.io?ref=USER123&utm_source=twitter',
    clicks: 234,
    conversions: 12,
    earnings: 687.45,
    createdAt: new Date('2024-02-01'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Campaña YouTube',
    url: 'https://tunova.io?ref=USER123&utm_source=youtube',
    clicks: 189,
    conversions: 8,
    earnings: 456.78,
    createdAt: new Date('2024-02-15'),
    isActive: false,
  },
];

const earningsData = [
  { name: 'Ene', earnings: 234, referrals: 12 },
  { name: 'Feb', earnings: 456, referrals: 23 },
  { name: 'Mar', earnings: 678, referrals: 34 },
  { name: 'Abr', earnings: 543, referrals: 28 },
  { name: 'May', earnings: 789, referrals: 41 },
  { name: 'Jun', earnings: 912, referrals: 47 },
];

const trafficSourceData = [
  { name: 'Redes Sociales', value: 45, color: '#81ff8a' },
  { name: 'Email Marketing', value: 25, color: '#8b5cf6' },
  { name: 'Blog/Website', value: 20, color: '#06b6d4' },
  { name: 'Otros', value: 10, color: '#f59e0b' },
];

const tierBenefits = {
  Bronze: { commission: 5, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  Silver: { commission: 7.5, color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
  Gold: { commission: 10, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  Platinum: { commission: 15, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
};

export function AffiliateDashboard() {
  const [stats, setStats] = useState<AffiliateStats>(mockStats);
  const [links, setLinks] = useState<ReferralLink[]>(mockLinks);
  const [newLinkName, setNewLinkName] = useState('');
  const [showCreateLink, setShowCreateLink] = useState(false);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('¡Enlace copiado al portapapeles!');
  };

  const createNewLink = () => {
    if (!newLinkName.trim()) {
      toast.error('Ingresa un nombre para el enlace');
      return;
    }

    const newLink: ReferralLink = {
      id: Date.now().toString(),
      name: newLinkName,
      url: `https://tunova.io?ref=USER123&utm_campaign=${newLinkName.toLowerCase().replace(/\s+/g, '_')}`,
      clicks: 0,
      conversions: 0,
      earnings: 0,
      createdAt: new Date(),
      isActive: true,
    };

    setLinks(prev => [newLink, ...prev]);
    setNewLinkName('');
    setShowCreateLink(false);
    toast.success('¡Enlace de afiliado creado exitosamente!');
  };

  const toggleLinkStatus = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const currentTier = tierBenefits[stats.tier];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold neon-text font-retro">
          Panel de Afiliados 💰
        </h1>
        <p className="text-gray-300 text-lg">
          Gana dinero compartiendo Tunova con tu audiencia
        </p>
      </motion.div>

      {/* Tier Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`glass-card p-6 text-center ${currentTier.bgColor} border-2 border-transparent`}
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <HandRaisedIcon className={`w-8 h-8 ${currentTier.color}`} />
          <h2 className={`text-2xl font-bold ${currentTier.color} font-retro`}>
            Tier {stats.tier}
          </h2>
        </div>
        <p className="text-gray-300 mb-2">
          Comisión actual: <span className={`font-bold ${currentTier.color}`}>
            {currentTier.commission}%
          </span>
        </p>
        <div className="text-sm text-gray-400">
          {stats.totalReferrals < 50 && 'Refiere 50 usuarios para alcanzar Silver'}
          {stats.totalReferrals >= 50 && stats.totalReferrals < 100 && 'Refiere 100 usuarios para alcanzar Gold'}
          {stats.totalReferrals >= 100 && stats.totalReferrals < 200 && 'Refiere 200 usuarios para alcanzar Platinum'}
          {stats.totalReferrals >= 200 && '¡Has alcanzado el tier máximo!'}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Ganancias Totales',
            value: formatCurrency(stats.totalEarnings),
            icon: CurrencyDollarIcon,
            color: 'text-green-400',
            bgColor: 'bg-green-400/10',
            change: '+12.5%',
          },
          {
            label: 'Referidos Totales',
            value: stats.totalReferrals.toString(),
            icon: UserGroupIcon,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
            change: '+8',
          },
          {
            label: 'Tasa de Conversión',
            value: `${stats.conversionRate}%`,
            icon: ChartBarIcon,
            color: 'text-purple-400',
            bgColor: 'bg-purple-400/10',
            change: '+2.1%',
          },
          {
            label: 'Clicks Este Mes',
            value: formatNumber(stats.clicksThisMonth),
            icon: EyeIcon,
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-400/10',
            change: '+15.7%',
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
        {/* Earnings Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Rendimiento de Ganancias</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
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
                dataKey="earnings"
                stroke="#81ff8a"
                strokeWidth={3}
                dot={{ fill: '#81ff8a', strokeWidth: 2, r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="referrals"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold mb-6">Fuentes de Tráfico</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSourceData.map((entry, index) => (
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
            {trafficSourceData.map((source) => (
              <div key={source.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-sm text-gray-300">{source.name}</span>
                <span className="text-sm text-gray-500">{source.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Referral Links Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Enlaces de Afiliado</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateLink(true)}
            className="btn-neon px-4 py-2 flex items-center space-x-2"
          >
            <LinkIcon className="w-5 h-5" />
            <span>Crear Enlace</span>
          </motion.button>
        </div>

        {/* Create New Link Form */}
        {showCreateLink && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-dark-700/50 rounded-lg"
          >
            <div className="flex space-x-4">
              <input
                type="text"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                placeholder="Nombre del enlace (ej: Campaña Instagram)"
                className="input-neon flex-1"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={createNewLink}
                className="btn-neon px-6 py-2"
              >
                Crear
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateLink(false)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancelar
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Links List */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-4 rounded-lg border transition-all ${
                link.isActive 
                  ? 'bg-dark-700/50 border-neon-green/30' 
                  : 'bg-dark-700/30 border-gray-600/30 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-white">{link.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      link.isActive 
                        ? 'text-green-400 bg-green-400/10' 
                        : 'text-gray-400 bg-gray-400/10'
                    }`}>
                      {link.isActive ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <code className="text-sm text-gray-300 bg-dark-600 px-3 py-1 rounded flex-1 truncate">
                      {link.url}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(link.url)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Clicks</div>
                      <div className="font-semibold text-white">{link.clicks}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Conversiones</div>
                      <div className="font-semibold text-white">{link.conversions}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Ganancias</div>
                      <div className="font-semibold text-green-400">{formatCurrency(link.earnings)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleLinkStatus(link.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      link.isActive
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {link.isActive ? 'Desactivar' : 'Activar'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Payout Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-semibold mb-6">Información de Pagos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-400 mb-2">Ganancias Pendientes</div>
            <div className="text-2xl font-bold text-yellow-400 mb-4">
              {formatCurrency(stats.pendingEarnings)}
            </div>
            <div className="text-sm text-gray-500">
              Próximo pago: 1 de Abril, 2024
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-400 mb-2">Método de Pago</div>
            <div className="text-white mb-2">PayPal: user@example.com</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-blue-400 hover:text-blue-300 underline"
            >
              Cambiar método de pago
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}