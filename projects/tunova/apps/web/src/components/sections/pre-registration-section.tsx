'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { 
  EnvelopeIcon, 
  WalletIcon, 
  ShareIcon, 
  GlobeAltIcon,
  TrophyIcon,
  UsersIcon 
} from '@heroicons/react/24/outline';

const preRegistrationSchema = z.object({
  email: z.string().email('Email inválido'),
  walletAddress: z.string().optional(),
  referralCode: z.string().optional(),
  role: z.enum(['fan', 'artist', 'producer']),
  newsletter: z.boolean().default(true),
});

type PreRegistrationForm = z.infer<typeof preRegistrationSchema>;

const MILESTONES = [
  { target: 10000, reward: 'Acceso Beta Temprano', reached: true },
  { target: 50000, reward: 'NFT Exclusivo de Fundador', reached: false },
  { target: 100000, reward: 'Airdrop de 1000 TUNE', reached: false },
  { target: 250000, reward: 'Concierto Virtual Exclusivo', reached: false },
];

export function PreRegistrationSection() {
  const [registrations, setRegistrations] = useState(47832);
  const [userReferrals, setUserReferrals] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PreRegistrationForm>({
    resolver: zodResolver(preRegistrationSchema),
  });

  // Simulate real-time registration updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRegistrations(prev => prev + Math.floor(Math.random() * 5));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Generate referral code
  const generateReferralCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setReferralCode(code);
    return code;
  };

  const onSubmit = async (data: PreRegistrationForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate referral code for new user
      const newReferralCode = generateReferralCode();
      
      // Simulate successful registration
      setRegistrations(prev => prev + 1);
      setShowSuccess(true);
      
      toast.success('¡Pre-registro exitoso! Revisa tu email para confirmar.');
      toast.success(`Tu código de referido: ${newReferralCode}`);
      
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      toast.error('Error en el pre-registro. Inténtalo de nuevo.');
    }
  };

  const shareReferral = () => {
    if (!referralCode) {
      toast.error('Completa tu pre-registro para obtener un código de referido');
      return;
    }

    const shareText = `¡Únete a Tunova, el futuro de la música Web3! Usa mi código de referido: ${referralCode} para obtener bonificaciones exclusivas. 🎵✨`;
    const shareUrl = `https://tunova.io?ref=${referralCode}`;

    if (navigator.share) {
      navigator.share({
        title: 'Tunova - El Futuro de la Música Web3',
        text: shareText,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success('Enlace de referido copiado al portapapeles!');
    }
  };

  const nextMilestone = MILESTONES.find(m => !m.reached);
  const progress = nextMilestone ? (registrations / nextMilestone.target) * 100 : 100;

  return (
    <section id="pre-registration" className="py-20 bg-gradient-to-b from-dark-900 to-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-retro mb-6">
            <span className="neon-text">Pre-registro</span> Gamificado
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-display">
            Únete a la revolución musical Web3. Obtén acceso anticipado, recompensas exclusivas 
            y gana puntos NOVA por referir amigos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-dark-800/50 backdrop-blur-md border border-neon-green/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center neon-text font-retro">
              🚀 Únete Ahora
            </h3>

            {showSuccess ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-6"
              >
                <div className="text-6xl">🎉</div>
                <h4 className="text-xl font-semibold neon-text">¡Bienvenido a Tunova!</h4>
                <p className="text-gray-300">
                  Tu pre-registro ha sido confirmado. Revisa tu email para más detalles.
                </p>
                <div className="bg-dark-700/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Tu código de referido:</p>
                  <div className="flex items-center justify-between bg-dark-600 rounded px-3 py-2">
                    <code className="text-neon-green font-mono">{referralCode}</code>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareReferral}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ShareIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="tu@email.com"
                      className="input-neon pl-10 w-full"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Wallet Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dirección de Wallet (Opcional)
                  </label>
                  <div className="relative">
                    <WalletIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('walletAddress')}
                      type="text"
                      placeholder="0x..."
                      className="input-neon pl-10 w-full"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ¿Cuál es tu rol principal? *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'fan', label: 'Fan', emoji: '🎵' },
                      { value: 'artist', label: 'Artista', emoji: '🎤' },
                      { value: 'producer', label: 'Productor', emoji: '🎛️' },
                    ].map((role) => (
                      <label key={role.value} className="cursor-pointer">
                        <input
                          {...register('role')}
                          type="radio"
                          value={role.value}
                          className="sr-only"
                        />
                        <div className="bg-dark-700 border border-gray-600 rounded-lg p-3 text-center hover:border-neon-green transition-colors peer-checked:border-neon-green peer-checked:bg-neon-green/10">
                          <div className="text-2xl mb-1">{role.emoji}</div>
                          <div className="text-sm font-medium">{role.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
                  )}
                </div>

                {/* Referral Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Código de Referido (Opcional)
                  </label>
                  <input
                    {...register('referralCode')}
                    type="text"
                    placeholder="Código de referido"
                    className="input-neon w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    +100 NOVA para ti y tu referidor
                  </p>
                </div>

                {/* Newsletter */}
                <div className="flex items-center space-x-3">
                  <input
                    {...register('newsletter')}
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-neon-green bg-dark-700 border-gray-600 rounded focus:ring-neon-green focus:ring-2"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-300">
                    Recibir actualizaciones y noticias de Tunova
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-neon py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="loading-spinner w-5 h-5" />
                      <span>Registrando...</span>
                    </div>
                  ) : (
                    'Completar Pre-registro'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Stats and Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Live Counter */}
            <div className="bg-dark-800/50 backdrop-blur-md border border-neon-green/30 rounded-2xl p-8 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <UsersIcon className="w-8 h-8 text-neon-green" />
                <h3 className="text-2xl font-bold neon-text font-retro">Comunidad Global</h3>
              </div>
              
              <motion.div
                key={registrations}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold neon-text font-retro mb-2"
              >
                {registrations.toLocaleString()}
              </motion.div>
              
              <p className="text-gray-400 mb-4">Usuarios pre-registrados</p>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                <span className="text-sm text-gray-500">Actualizando en tiempo real</span>
              </div>
            </div>

            {/* Next Milestone */}
            {nextMilestone && (
              <div className="bg-dark-800/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <TrophyIcon className="w-6 h-6 text-yellow-400" />
                  <h4 className="text-xl font-semibold">Próximo Hito</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{registrations.toLocaleString()}</span>
                      <span>{nextMilestone.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-purple-400 font-semibold">{nextMilestone.reward}</p>
                    <p className="text-sm text-gray-500">
                      {(nextMilestone.target - registrations).toLocaleString()} registros restantes
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* All Milestones */}
            <div className="bg-dark-800/50 backdrop-blur-md border border-gray-600/30 rounded-2xl p-8">
              <h4 className="text-xl font-semibold mb-6 text-center">🎯 Hitos de la Comunidad</h4>
              
              <div className="space-y-4">
                {MILESTONES.map((milestone, index) => (
                  <motion.div
                    key={milestone.target}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      milestone.reached
                        ? 'bg-neon-green/10 border-neon-green text-neon-green'
                        : 'bg-dark-700/50 border-gray-600 text-gray-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">
                        {milestone.target.toLocaleString()} usuarios
                      </div>
                      <div className="text-sm opacity-75">{milestone.reward}</div>
                    </div>
                    <div className="text-2xl">
                      {milestone.reached ? '✅' : '🎁'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Global Heatmap Preview */}
            <div className="bg-dark-800/50 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center space-x-2 mb-4">
                <GlobeAltIcon className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-semibold">Mapa Global</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { country: '🇺🇸 Estados Unidos', users: '12,847' },
                  { country: '🇧🇷 Brasil', users: '8,932' },
                  { country: '🇲🇽 México', users: '6,421' },
                  { country: '🇪🇸 España', users: '4,892' },
                ].map((stat) => (
                  <div key={stat.country} className="flex justify-between">
                    <span className="text-gray-400">{stat.country}</span>
                    <span className="text-blue-400 font-semibold">{stat.users}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                  Ver mapa completo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}