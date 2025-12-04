# WebOS Nova

A modern, feature-rich web-based operating system built with React, TypeScript, and Vite. WebOS Nova delivers a complete desktop experience directly in your browser, featuring 25+ fully functional applications, AI-powered assistance, and a beautiful, responsive interface.

## Features

### Core System
- **Desktop Environment**: Full-featured desktop with draggable windows, taskbar, and start menu
- **Window Management**: Minimize, maximize, close, and drag windows with smooth animations
- **Lock Screen**: Secure boot screen with customizable user profile and wallpaper
- **Settings Panel**: Comprehensive system settings including themes and wallpaper customization
- **Virtual Desktops**: Multiple desktop workspaces for better organization
- **AI Copilot**: Integrated AI assistant powered by Groq (Llama 3.3 70B) for natural language interactions

### Applications

#### Productivity
- **Notes**: Rich text note-taking application with local storage
- **Code Editor**: Monaco-based code editor with syntax highlighting for multiple languages
- **Markdown Editor**: Live preview markdown editor
- **Calculator**: Full-featured calculator with standard operations
- **Calendar**: Interactive calendar with event management
- **To-Do List**: Task management with categories and priorities

#### Communication & Media
- **Chat**: Real-time messaging application
- **Spotify**: Embedded Spotify web player integration
- **Video Player**: Media player with playlist support
- **Image Viewer**: Gallery-style image viewer with zoom and slideshow

#### Utilities
- **File Explorer**: File system browser with folder navigation
- **Weather**: Live weather data powered by OpenWeatherMap API
- **Maps**: Interactive maps powered by Leaflet and OpenStreetMap
- **Clock**: World clock with multiple timezone support
- **Screenshot**: Screen capture tool
- **Camera**: Webcam access with photo capture
- **Voice Recorder**: Audio recording with playback and download

#### Creative Tools
- **Paint**: Canvas-based drawing application with brush tools and color picker
- **PDF Viewer**: Upload and view PDF documents

#### Internet & System
- **Browser**: Embedded web browser with URL navigation
- **Terminal**: Command-line interface (demo)
- **App Store**: Browse and install applications

## Technology Stack

### Frontend
- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Zustand**: Lightweight state management

### Key Libraries
- **Monaco Editor**: VS Code-based code editor
- **Leaflet**: Interactive maps
- **React-PDF**: PDF rendering
- **Dexie**: IndexedDB wrapper for local storage
- **Lucide React**: Beautiful icon library

### APIs & Services
- **Groq API**: AI assistant (Llama 3.3 70B)
- **OpenWeatherMap**: Weather data
- **OpenStreetMap**: Map tiles
- **Spotify Web Player**: Music streaming

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WEB-OS-NOVA.git
cd WEB-OS-NOVA
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
VITE_OPENWEATHER_API_KEY=your_openweathermap_key
VITE_GROQ_API_KEY=your_groq_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

## Project Structure

```
WEB-OS-NOVA/
├── src/
│   ├── apps/              # Individual application components
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Desktop.tsx   # Desktop environment
│   │   ├── Window.tsx    # Window manager
│   │   ├── Taskbar.tsx   # Bottom taskbar
│   │   └── ...
│   ├── stores/           # Zustand state stores
│   │   ├── appStore.ts   # Application registry
│   │   ├── windowStore.ts # Window management
│   │   └── settingsStore.ts # User settings
│   ├── pages/            # Main page components
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
├── public/               # Static assets
│   └── assets/          # Images and icons
├── .env.example         # Environment template
└── package.json         # Dependencies
```

## Configuration

### API Keys

The application requires the following API keys for full functionality:

1. **OpenWeatherMap API** (Weather App)
   - Sign up at https://openweathermap.org/api
   - Free tier provides 60 calls/minute
   
2. **Groq API** (AI Copilot)
   - Get your key at https://console.groq.com/keys
   - Free tier with generous rate limits

Add these keys to your `.env` file as shown in the installation steps.

### Customization

#### User Profile
Replace `public/assets/profile.png` with your own profile picture to customize the lock screen.

#### Wallpapers
Add custom wallpapers to `public/wallpapers/` and they will appear in the settings panel.

## Development

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Component-based architecture
- Hooks for state management

### State Management
- **appStore**: Manages installed applications and pinned items
- **windowStore**: Controls window positions, states, and focus
- **settingsStore**: Handles user preferences and system settings
- **fileSystemStore**: File system data using IndexedDB

### Adding New Applications

1. Create a new component in `src/apps/YourApp.tsx`
2. Add the app to `INITIAL_APPS` in `src/stores/appStore.ts`
3. Register the component in `getAppContent()` in `src/pages/Index.tsx`

Example:
```typescript
// In appStore.ts
{
  id: 'your-app',
  name: 'Your App',
  description: 'Description of your app',
  icon: YourIcon,
  category: 'Productivity',
  rating: 4.5,
  installed: true,
}

// In Index.tsx
case 'your-app':
  return <YourApp />;
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Some features require specific browser APIs:
- Camera app requires `getUserMedia()` API
- Screenshot app requires `getDisplayMedia()` API
- Voice Recorder requires `MediaRecorder` API

## Performance

- Lazy loading for application components
- Virtual desktop rendering
- Optimized state updates with Zustand
- Window virtualization for memory efficiency

## Security Considerations

- Environment variables for API keys (never commit `.env`)
- Client-side only - no backend server required
- CORS-aware proxy for external content
- Sandboxed iframe for browser app

## Known Limitations

- File system is browser-based (IndexedDB) - not persistent across domains
- Some websites block iframe embedding in the browser app
- Camera and microphone require explicit user permission
- Weather API has rate limits on free tier

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- UI components built with shadcn/ui
- Icons by Lucide
- Inspired by Windows 11 and macOS design languages
- Built with modern web technologies

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the code examples in `/src/apps`

## Roadmap

Future enhancements planned:
- Cloud storage integration
- Multi-user support
- Plugin system for third-party apps
- Mobile-responsive design
- Offline mode with service workers
- Customizable themes and color schemes

---

Built with React, TypeScript, and modern web technologies.