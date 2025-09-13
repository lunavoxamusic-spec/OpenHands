# Tunova - El Futuro de la Música Web3

🎵 **Plataforma musical descentralizada con reproductor cassette retro**

## Descripción del Proyecto

Tunova es una plataforma musical Web3 innovadora que combina la nostalgia retro de los cassettes con tecnología blockchain de vanguardia. Ofrece una experiencia inmersiva para fans, artistas y productores musicales con funcionalidades de streaming, NFTs, IA generativa y gamificación.

### Características Principales

- 🎧 **Reproductor Cassette Retro**: Experiencia visual y auditiva nostálgica con animaciones realistas
- 🎮 **Mini-juegos Interactivos**: Cassette Collector, Beat Creator, NFT Puzzle
- 🪙 **Sistema Tokenómico Dual**: $TUNE (ERC-20) y $NOVA (puntos de gamificación)
- 🖼️ **Marketplace NFT**: Con generación de covers por IA
- 📱 **Aplicación Móvil**: React Native con integración completa
- 🎨 **Estética Neón**: Gradiente verde (#81ff8a → #64965e) en modo oscuro

## Estructura del Proyecto

```
tunova-platform/
├── apps/
│   ├── web/                 # Next.js web application
│   ├── mobile/             # React Native mobile app
│   └── api/                # Node.js backend API
├── packages/
│   ├── ui/                 # Shared UI components
│   ├── database/           # Prisma schemas & migrations
│   ├── smart-contracts/    # Solidity contracts
│   ├── shared/             # Shared utilities & types
│   └── ai-engine/          # AI/ML services
├── tools/
│   ├── eslint-config/      # Linting configuration
│   ├── typescript-config/  # TypeScript configuration
│   └── build-tools/        # Custom build scripts
└── docs/
    ├── api/                # API documentation
    ├── smart-contracts/    # Contract documentation
    └── user-guides/        # User documentation
```

## Stack Tecnológico

### Frontend
- **Next.js 14** con App Router
- **TypeScript** estricto
- **TailwindCSS** + Framer Motion
- **Web3Modal** para conexiones de wallet
- **Zustand** para gestión de estado
- **React Query** para data fetching

### Backend
- **Node.js** + Express con TypeScript
- **GraphQL** con Apollo Server
- **PostgreSQL** + Prisma ORM
- **Redis** para caching y sesiones
- **AWS S3** para almacenamiento de audio
- **IPFS** para metadata descentralizado

### Blockchain
- **Multi-chain**: Ethereum, Polygon, Base
- **Solidity** smart contracts
- **Hardhat** development environment
- **OpenZeppelin** para estándares de seguridad

### Mobile
- **React Native 0.72+**
- **Redux Toolkit**
- **React Navigation 6**
- **Reanimated 3**

## Público Objetivo

- 🎵 **Fans**: Descubrimiento musical, colección de NFTs, experiencias sociales
- 🎤 **Artistas**: Monetización, analytics, engagement con fans
- 🎛️ **Productores**: Herramientas de estudio, colaboración, marketplace de beats

## Colores de Marca

- **Gradiente Principal**: #81ff8a → #64965e (verde neón)
- **Modo**: Dark Mode por defecto
- **Acentos**: Efectos de partículas neón y animaciones retro

## Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone <repository-url>
cd tunova-platform

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en modo desarrollo
npm run dev
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Contacto

- **Website**: [tunova.io](https://tunova.io)
- **Twitter**: [@TunovaMusic](https://twitter.com/TunovaMusic)
- **Discord**: [Tunova Community](https://discord.gg/tunova)

---

*Construyendo el futuro de la música con Web3* 🚀