# 🚀 WebOS Nova

A modern, browser-based operating system built with cutting-edge web technologies. Experience a fully functional desktop environment right in your browser with draggable windows, file management, built-in applications, and PWA support.

![WebOS Nova](./public/assets/welcome-banner.jpg)

## ✨ Features

### 🖥️ Desktop Experience
- **Full Desktop Environment** - Complete OS experience in your browser
- **Boot Animation** - Stunning startup sequence with progress bar and particle effects
- **Dynamic Wallpapers** - Multiple beautiful wallpapers with parallax effects
- **Context Menus** - Right-click functionality for desktop and files

### 🪟 Window Management
- **Draggable Windows** - Move windows anywhere on the screen
- **Resizable Windows** - Resize from any edge or corner
- **Minimize/Maximize** - Full window state management
- **Multi-Window Support** - Run multiple applications simultaneously
- **Z-Index Management** - Automatic focus and layering
- **Snap-to-Edges** - Windows snap to screen edges for easy organization

### 📁 File System
- **IndexedDB Storage** - Persistent file storage using Dexie
- **File Operations** - Create, read, update, and delete files
- **Folder Management** - Organize files in nested folders
- **Search Functionality** - Quick file and content search
- **File Preview** - Preview text files and images

### 🎯 Built-in Applications

#### 📝 Notes
- Rich text editor with auto-save
- Create and manage multiple notes
- Persistent storage

#### 🧮 Calculator
- Standard calculator operations
- Keyboard support
- Memory functions
- Beautiful gradient UI

#### 💻 Terminal
- xterm.js powered terminal
- Mock shell with common commands
- Command history (Arrow Up/Down)
- File system integration
- Custom neon theme

#### 📂 File Explorer
- Three-pane layout
- Breadcrumb navigation
- File operations toolbar
- Context menu support
- Search functionality

#### ✅ Todo
- Task management with checkboxes
- Priority levels (High, Medium, Low)
- Filter by status (All, Active, Completed)
- Local storage persistence

### 🎨 Customization
- **Themes** - Light, Dark, and Glass themes
- **Accent Colors** - Choose from 6 vibrant accent colors
- **Wallpaper Manager** - Multiple wallpapers to choose from
- **Settings Panel** - Comprehensive customization options

### 🔔 System Features
- **Taskbar** - Shows running apps with active indicators
- **Start Menu** - Quick access to all applications
- **System Tray** - Network, battery, and user info
- **Notifications** - Toast notifications with history
- **Command Palette** - Quick actions with Ctrl+K

### 📱 PWA Support
- **Installable** - Install as a standalone app
- **Offline Support** - Works without internet connection
- **Service Worker** - Caching for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations and transitions

### State Management
- **Zustand** - Lightweight state management
- **Persist Middleware** - Settings persistence

### Storage & Data
- **Dexie** - IndexedDB wrapper for file system
- **LocalStorage** - Quick data persistence

### UI Libraries
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon set
- **xterm.js** - Terminal emulation

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Playwright** - E2E testing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+ (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abhi3114-glitch/WEB-OS-NOVA.git
cd WEB-OS-NOVA

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
pnpm run build

# Preview production build
pnpm run preview
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run lint` | Run ESLint |
| `pnpm run test` | Run unit tests |
| `pnpm run e2e` | Run E2E tests |

## 🎮 Usage

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Open Command Palette |
| `Ctrl+N` | New File |
| `Ctrl+Shift+N` | New Folder |
| `Alt+Tab` | Switch Windows |
| `Win` | Open Start Menu |
| `Ctrl+Q` | Close Window |
| `F11` | Toggle Fullscreen |

### Desktop Interactions
- **Double-click** desktop icons to open applications
- **Right-click** desktop for context menu
- **Drag** windows to move them
- **Resize** windows from edges or corners
- **Click** taskbar icons to focus/restore windows

### Terminal Commands
```bash
help       # Show available commands
ls         # List files in current directory
cd         # Change directory
cat        # Display file contents
clear      # Clear terminal screen
echo       # Print text to terminal
date       # Show current date and time
whoami     # Display current user
```

## 🏗️ Project Structure

```
webos-nova/
├── public/
│   └── assets/
│       ├── boot-logo.png
│       ├── wallpaper-*.jpg
│       └── app-icon-*.png
├── src/
│   ├── apps/                 # Built-in applications
│   │   ├── CalculatorApp.tsx
│   │   ├── NotesApp.tsx
│   │   ├── TerminalApp.tsx
│   │   ├── FileExplorerApp.tsx
│   │   └── TodoApp.tsx
│   ├── components/           # UI components
│   │   ├── BootScreen.tsx
│   │   ├── Desktop.tsx
│   │   ├── Window.tsx
│   │   ├── Taskbar.tsx
│   │   ├── StartMenu.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── stores/              # Zustand stores
│   │   ├── windowStore.ts
│   │   ├── fileSystemStore.ts
│   │   ├── settingsStore.ts
│   │   └── notificationStore.ts
│   ├── utils/               # Utilities
│   │   ├── db.ts           # Dexie database
│   │   └── constants.ts    # App constants
│   ├── pages/              # Route pages
│   │   └── Index.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Design System

### Color Palette
- **Primary Background**: `#0A0A0A` (Deep Black)
- **Secondary Background**: `#1A1A1A` (Charcoal)
- **Accent Pink**: `#FF006E` (Neon Pink)
- **Accent Teal**: `#00F5FF` (Neon Teal)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#B0B0B0` (Light Gray)

### Typography
- **Font Family**: Inter (UI), JetBrains Mono (Code)
- **Heading 1**: 48px, Bold
- **Heading 2**: 36px, Semi-bold
- **Body**: 14px, Regular

### Animations
- **Spring Physics**: stiffness: 300, damping: 25
- **Glassmorphism**: backdrop-blur-xl with transparency
- **Transitions**: Smooth 300ms ease-out

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# AI Copilot API Key (optional)
VITE_COPILOT_API_KEY=your_api_key_here

# Other optional configurations
VITE_APP_NAME=WebOS Nova
VITE_APP_VERSION=1.0.0
```

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abhi3114-glitch/WEB-OS-NOVA)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
pnpm run build

# Deploy dist folder to Netlify
netlify deploy --prod --dir=dist
```

## 🧪 Testing

### Unit Tests
```bash
pnpm run test
```

### E2E Tests
```bash
pnpm run e2e
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Dexie](https://dexie.org/) - IndexedDB wrapper
- [xterm.js](https://xtermjs.org/) - Terminal emulator

## 📧 Contact

**Project Link**: [https://github.com/abhi3114-glitch/WEB-OS-NOVA](https://github.com/abhi3114-glitch/WEB-OS-NOVA)

## 🗺️ Roadmap

- [ ] AI Copilot integration with OpenAI
- [ ] App Store with installable apps
- [ ] Multi-user support with authentication
- [ ] Cloud sync for files and settings
- [ ] Real-time collaboration features
- [ ] More built-in applications (Music Player, Video Player, etc.)
- [ ] Plugin system for third-party apps
- [ ] Mobile responsive design
- [ ] Internationalization (i18n) support
- [ ] Dark/Light theme auto-switching

## 📊 Performance

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: ~1MB (gzipped: ~310KB)

## 🐛 Known Issues

- Window resize may lag on older devices
- Terminal doesn't support all UNIX commands
- File system limited to browser storage quota

## 💡 Tips

- Use Chrome or Edge for best performance
- Install as PWA for native app experience
- Enable hardware acceleration in browser settings
- Clear browser cache if experiencing issues

---

Made with ❤️ by the WebOS Nova Team

**Star ⭐ this repository if you find it useful!**