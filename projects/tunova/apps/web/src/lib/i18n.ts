import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        minigames: 'Mini-games',
        roadmap: 'Roadmap',
        team: 'Team',
        dashboard: 'Dashboard',
        connectWallet: 'Connect Wallet',
      },
      // Hero Section
      hero: {
        title: 'The Future of Web3 Music',
        subtitle: 'A decentralized musical platform where artists, fans and producers connect in a fair and transparent ecosystem.',
        joinRevolution: 'Join the Revolution',
        preRegistrations: 'Pre-registrations',
        liveCounter: 'Live counter',
      },
      // Minigames
      minigames: {
        title: 'Interactive Mini-games',
        subtitle: 'Play, earn NOVA points and unlock exclusive rewards while discovering the future of music.',
        cassetteCollector: {
          title: 'Cassette Collector',
          description: 'Collect virtual cassettes and earn NOVA points. Each cassette unlocks exclusive content.',
          play: 'Play Now',
        },
        beatCreator: {
          title: 'Beat Creator',
          description: 'Create 8-second beats with retro samples. Share your creations and convert them to NFTs.',
          create: 'Create Beat',
        },
        nftPuzzle: {
          title: 'NFT Puzzle',
          description: 'Solve puzzles of AI-generated music covers. Complete to download artwork as wallpaper.',
          solve: 'Solve Puzzle',
        },
      },
      // Dashboard
      dashboard: {
        welcome: 'Welcome to Tunova',
        selectRole: 'Select your role to continue',
        fan: 'Fan',
        artist: 'Artist',
        producer: 'Producer',
        admin: 'Administrator',
      },
      // Common
      common: {
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        update: 'Update',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        export: 'Export',
        import: 'Import',
        settings: 'Settings',
        profile: 'Profile',
        logout: 'Logout',
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        name: 'Name',
        username: 'Username',
        bio: 'Biography',
        website: 'Website',
        social: 'Social Networks',
        notifications: 'Notifications',
        privacy: 'Privacy',
        security: 'Security',
        language: 'Language',
        theme: 'Theme',
        help: 'Help',
        support: 'Support',
        about: 'About',
        terms: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
        cookies: 'Cookies',
        status: 'Status',
        version: 'Version',
        copyright: 'All rights reserved',
      },
    },
  },
  es: {
    translation: {
      // Navigation
      nav: {
        home: 'Inicio',
        minigames: 'Mini-juegos',
        roadmap: 'Hoja de Ruta',
        team: 'Equipo',
        dashboard: 'Panel',
        connectWallet: 'Conectar Wallet',
      },
      // Hero Section
      hero: {
        title: 'El Futuro de la Música Web3',
        subtitle: 'Una plataforma musical descentralizada donde artistas, fans y productores se conectan en un ecosistema justo y transparente.',
        joinRevolution: 'Únete a la Revolución',
        preRegistrations: 'Pre-registros',
        liveCounter: 'Contador en vivo',
      },
      // Minigames
      minigames: {
        title: 'Mini-juegos Interactivos',
        subtitle: 'Juega, gana puntos NOVA y desbloquea recompensas exclusivas mientras descubres el futuro de la música.',
        cassetteCollector: {
          title: 'Coleccionista de Cassettes',
          description: 'Colecciona cassettes virtuales y gana puntos NOVA. Cada cassette desbloquea contenido exclusivo.',
          play: 'Jugar Ahora',
        },
        beatCreator: {
          title: 'Creador de Beats',
          description: 'Crea beats de 8 segundos con samples retro. Comparte tus creaciones y conviértelas en NFTs.',
          create: 'Crear Beat',
        },
        nftPuzzle: {
          title: 'Puzzle NFT',
          description: 'Resuelve puzzles de covers musicales generadas por IA. Completa para descargar el artwork como wallpaper.',
          solve: 'Resolver Puzzle',
        },
      },
      // Dashboard
      dashboard: {
        welcome: 'Bienvenido a Tunova',
        selectRole: 'Selecciona tu rol para continuar',
        fan: 'Fan',
        artist: 'Artista',
        producer: 'Productor',
        admin: 'Administrador',
      },
      // Common
      common: {
        loading: 'Cargando...',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        create: 'Crear',
        update: 'Actualizar',
        search: 'Buscar',
        filter: 'Filtrar',
        sort: 'Ordenar',
        export: 'Exportar',
        import: 'Importar',
        settings: 'Configuración',
        profile: 'Perfil',
        logout: 'Cerrar Sesión',
        login: 'Iniciar Sesión',
        register: 'Registrarse',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        name: 'Nombre',
        username: 'Nombre de Usuario',
        bio: 'Biografía',
        website: 'Sitio Web',
        social: 'Redes Sociales',
        notifications: 'Notificaciones',
        privacy: 'Privacidad',
        security: 'Seguridad',
        language: 'Idioma',
        theme: 'Tema',
        help: 'Ayuda',
        support: 'Soporte',
        about: 'Acerca de',
        terms: 'Términos de Servicio',
        privacyPolicy: 'Política de Privacidad',
        cookies: 'Cookies',
        status: 'Estado',
        version: 'Versión',
        copyright: 'Todos los derechos reservados',
      },
    },
  },
  pt: {
    translation: {
      // Navigation
      nav: {
        home: 'Início',
        minigames: 'Mini-jogos',
        roadmap: 'Roteiro',
        team: 'Equipe',
        dashboard: 'Painel',
        connectWallet: 'Conectar Carteira',
      },
      // Hero Section
      hero: {
        title: 'O Futuro da Música Web3',
        subtitle: 'Uma plataforma musical descentralizada onde artistas, fãs e produtores se conectam em um ecossistema justo e transparente.',
        joinRevolution: 'Junte-se à Revolução',
        preRegistrations: 'Pré-registros',
        liveCounter: 'Contador ao vivo',
      },
      // Minigames
      minigames: {
        title: 'Mini-jogos Interativos',
        subtitle: 'Jogue, ganhe pontos NOVA e desbloqueie recompensas exclusivas enquanto descobre o futuro da música.',
        cassetteCollector: {
          title: 'Colecionador de Cassetes',
          description: 'Colete cassetes virtuais e ganhe pontos NOVA. Cada cassete desbloqueia conteúdo exclusivo.',
          play: 'Jogar Agora',
        },
        beatCreator: {
          title: 'Criador de Beats',
          description: 'Crie beats de 8 segundos com samples retrô. Compartilhe suas criações e converta-as em NFTs.',
          create: 'Criar Beat',
        },
        nftPuzzle: {
          title: 'Quebra-cabeça NFT',
          description: 'Resolva quebra-cabeças de capas musicais geradas por IA. Complete para baixar a arte como papel de parede.',
          solve: 'Resolver Quebra-cabeça',
        },
      },
      // Dashboard
      dashboard: {
        welcome: 'Bem-vindo ao Tunova',
        selectRole: 'Selecione seu papel para continuar',
        fan: 'Fã',
        artist: 'Artista',
        producer: 'Produtor',
        admin: 'Administrador',
      },
      // Common
      common: {
        loading: 'Carregando...',
        save: 'Salvar',
        cancel: 'Cancelar',
        delete: 'Excluir',
        edit: 'Editar',
        create: 'Criar',
        update: 'Atualizar',
        search: 'Pesquisar',
        filter: 'Filtrar',
        sort: 'Classificar',
        export: 'Exportar',
        import: 'Importar',
        settings: 'Configurações',
        profile: 'Perfil',
        logout: 'Sair',
        login: 'Entrar',
        register: 'Registrar',
        email: 'E-mail',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        name: 'Nome',
        username: 'Nome de Usuário',
        bio: 'Biografia',
        website: 'Site',
        social: 'Redes Sociais',
        notifications: 'Notificações',
        privacy: 'Privacidade',
        security: 'Segurança',
        language: 'Idioma',
        theme: 'Tema',
        help: 'Ajuda',
        support: 'Suporte',
        about: 'Sobre',
        terms: 'Termos de Serviço',
        privacyPolicy: 'Política de Privacidade',
        cookies: 'Cookies',
        status: 'Status',
        version: 'Versão',
        copyright: 'Todos os direitos reservados',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;