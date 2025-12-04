# WebOS Nova - Development Plan

## Design Guidelines

### Design References (Primary Inspiration)
- **Windows 11**: Modern glassmorphism, rounded corners, subtle shadows
- **macOS**: Clean UI, smooth animations, intuitive interactions
- **Fluent Design System**: Acrylic materials, depth, motion
- **Style**: Glassmorphism + Dark Mode + Neon Accents

### Color Palette
- Primary: #0A0A0A (Deep Black - background)
- Secondary: #1A1A1A (Charcoal - windows/cards)
- Accent Pink: #FF006E (Neon Pink - primary accent)
- Accent Teal: #00F5FF (Neon Teal - secondary accent)
- Glass: rgba(26, 26, 26, 0.7) (Translucent windows)
- Text: #FFFFFF (White), #B0B0B0 (Light Gray - secondary)
- Border: rgba(255, 255, 255, 0.1) (Subtle borders)

### Typography
- Heading1: Inter font-weight 700 (48px)
- Heading2: Inter font-weight 600 (36px)
- Heading3: Inter font-weight 600 (24px)
- Body/Normal: Inter font-weight 400 (14px)
- Body/Emphasis: Inter font-weight 600 (14px)
- Code: JetBrains Mono font-weight 400 (13px)

### Key Component Styles
- **Windows**: Glassmorphism with backdrop-blur-xl, rounded-2xl, shadow-2xl
- **Buttons**: Gradient backgrounds (pink to teal), rounded-lg, hover: scale-105
- **Icons**: Lucide icons, 20px default size
- **Animations**: Spring physics (type: "spring", stiffness: 300, damping: 25)
- **Shadows**: Multi-layer shadows for depth (0 10px 40px rgba(0,0,0,0.3))

### Layout & Spacing
- Desktop: Full viewport with grid for icons (80px spacing)
- Windows: Min 400x300px, max viewport - 100px padding
- Taskbar: 60px height, bottom fixed
- Start Menu: 600x700px, bottom-left positioned
- Widget spacing: 16px gaps

### Images to Generate
1. **boot-logo.png** - WebOS Nova logo with neon glow effect (Style: vector-style, neon pink/teal gradient)
2. **wallpaper-default.jpg** - Abstract geometric patterns with dark gradient (Style: photorealistic, dark mood, neon accents)
3. **wallpaper-space.jpg** - Deep space nebula with stars (Style: photorealistic, cosmic theme)
4. **wallpaper-waves.jpg** - Flowing liquid waves with gradient (Style: 3d, fluid dynamics)
5. **app-icon-notes.png** - Notepad icon with neon outline (Style: minimalist, icon design)
6. **app-icon-calculator.png** - Calculator icon with glass effect (Style: minimalist, icon design)
7. **app-icon-terminal.png** - Terminal window icon (Style: minimalist, icon design)
8. **app-icon-files.png** - Folder icon with gradient (Style: minimalist, icon design)
9. **copilot-avatar.png** - AI assistant avatar with glow (Style: 3d, futuristic)
10. **welcome-banner.jpg** - Welcome screen background (Style: photorealistic, tech aesthetic)

---

## Development Tasks

### Phase 1: Project Setup & Core Infrastructure (Tasks 1-5)

1. **Install All Dependencies**
   - Install: zustand, framer-motion, interactjs, xterm, idb, dexie, react-i18next, lucide-react
   - Dev dependencies: @types/node, @playwright/test, husky, lint-staged
   - Configure package.json scripts (dev, build, test, e2e, lint, format)

2. **Generate All Images**
   - Use ImageCreator.generate_image for all 10 images listed above
   - Save to public/assets/images/ and public/assets/icons/

3. **Configure Build Tools**
   - Update vite.config.ts with PWA plugin, path aliases
   - Configure tailwind.config.ts with glassmorphism utilities, custom colors
   - Setup ESLint, Prettier, Husky pre-commit hooks
   - Create .env.example with COPILOT_API_KEY

4. **Create Folder Structure**
   - /src/apps/{calculator,notes,image-viewer,terminal,file-explorer,todo}
   - /src/components/{desktop,window,taskbar,start-menu,notifications,settings}
   - /src/stores/{window-store,file-system-store,settings-store,notification-store}
   - /src/hooks/{use-window-manager,use-file-system,use-shortcuts}
   - /src/utils/{db,constants,helpers}
   - /src/i18n/{en,hi}

5. **Setup State Management (Zustand)**
   - Create windowStore: manage open windows, z-index, positions, sizes
   - Create fileSystemStore: IndexedDB operations, file CRUD
   - Create settingsStore: theme, language, accessibility settings
   - Create notificationStore: notification queue, history

### Phase 2: Core UI Components (Tasks 6-11)

6. **Boot Screen Component**
   - Full-screen overlay with WebOS Nova logo
   - Animated progress bar with particle effects using Framer Motion
   - Fade transition to desktop (duration: 3s)
   - Boot sequence: logo fade-in → progress bar → fade to desktop

7. **Desktop Component**
   - Grid layout for desktop icons (80px spacing)
   - Right-click context menu (New Folder, New File, Rename, Delete, Properties)
   - Double-click to open apps in windows
   - Wallpaper background with parallax effect
   - Desktop widgets container (draggable area)

8. **Window Component**
   - Draggable header using interactjs
   - Resizable borders (8 directions)
   - Minimize/Maximize/Close buttons
   - Glassmorphism styling with backdrop-blur
   - Z-index management on focus
   - Snap-to-edges functionality (threshold: 20px)
   - Window animations (open: scale + fade, close: scale-out)

9. **Taskbar Component**
   - Fixed bottom bar (60px height)
   - Start button (left)
   - Running apps with icons and active indicator
   - System tray (right): notifications, network, battery, user avatar
   - Window preview on hover (thumbnail with title)
   - Context menu for running apps (Close, Minimize All)

10. **Start Menu Component**
    - Slide-up animation from taskbar
    - Pinned apps section (grid layout)
    - All apps list (scrollable)
    - Search bar at top (filters apps)
    - User profile section at bottom
    - Power options (Restart, Shutdown animations)

11. **Command Palette Component**
    - Modal overlay (Ctrl+K to toggle)
    - Fuzzy search input
    - Commands list: Open App, Create File, Run Terminal Command, Settings
    - Keyboard navigation (Arrow keys, Enter)
    - Recent commands history

### Phase 3: File System & Storage (Tasks 12-14)

12. **IndexedDB Setup (Dexie)**
    - Database schema: files, folders, settings, notifications
    - File model: id, name, type, content, parentId, createdAt, modifiedAt
    - Folder model: id, name, parentId, createdAt
    - Seed initial data: Welcome folder with README.txt, demo-notes.md, 3 wallpapers

13. **File System Store**
    - CRUD operations: createFile, readFile, updateFile, deleteFile
    - Folder operations: createFolder, deleteFolder, moveFile
    - Search functionality: searchFiles (by name, content)
    - Import/Export: exportToZip, importFromZip (using JSZip)

14. **File Explorer App**
    - Three-pane layout: tree view (left), file list (center), preview (right)
    - Breadcrumb navigation
    - File operations toolbar (New, Delete, Rename, Copy, Paste)
    - Context menu for files/folders
    - File preview: text files (syntax highlight), images (thumbnail)
    - Drag-and-drop file moving

### Phase 4: Built-in Applications (Tasks 15-19)

15. **Notes App**
    - Rich text editor with toolbar (bold, italic, lists, headings)
    - Auto-save to IndexedDB (debounced 1s)
    - File list sidebar (recent notes)
    - Create new note, delete note
    - Markdown preview toggle

16. **Calculator App**
    - Standard calculator layout (4x5 grid)
    - Basic operations: +, -, *, /, %, √, ^
    - Display with history
    - Keyboard support (0-9, operators, Enter, Backspace)
    - Memory functions (MC, MR, M+, M-)

17. **Terminal App**
    - xterm.js integration with custom theme (neon colors)
    - Mock shell with commands: help, ls, cd, cat, open, clear, echo
    - Command history (Arrow Up/Down)
    - Clipboard support (Ctrl+C, Ctrl+V)
    - File system integration (ls shows IndexedDB files)

18. **Image Viewer App**
    - Display images from file system
    - Zoom controls (+, -, fit, actual size)
    - Navigation (prev/next if multiple images)
    - Slideshow mode (auto-advance every 3s)
    - Image info panel (name, size, dimensions)

19. **Todo App**
    - Task list with checkboxes
    - Add/Edit/Delete tasks
    - Priority levels (High, Medium, Low) with color coding
    - Filter: All, Active, Completed
    - Persist to IndexedDB
    - Due date picker

### Phase 5: Advanced Features (Tasks 20-24)

20. **AI Copilot UI**
    - Floating button (bottom-right, 60px circle)
    - Chat window (400x600px, resizable)
    - Message list with user/assistant bubbles
    - Input field with send button
    - Suggested actions chips (Open File, Search, Create Note)
    - "Apply" button for actions with undo functionality

21. **AI Copilot Backend Stub**
    - Create /server/api/copilot.ts (tRPC endpoint)
    - Mock responses for common queries
    - Action parser: extract commands from user input
    - RAG-ready hooks (placeholder for vector DB)
    - Config for OpenAI API (COPILOT_API_KEY from .env)

22. **App Store Component**
    - Grid of app cards (3 columns)
    - Each card: icon, name, description, preview image, Install button
    - Filter: All, Productivity, Games, Utilities
    - Search bar
    - Install flow: download → add to launcher → create default files
    - Installed apps badge

23. **Notifications System**
    - Notification center (slide from right)
    - Notification item: icon, title, message, timestamp, action buttons
    - Toast notifications (auto-dismiss after 5s)
    - Persist to IndexedDB
    - Clear all button
    - Do Not Disturb mode

24. **Settings Panel**
    - Tabbed interface: Appearance, Personalization, Accessibility, About
    - Appearance: theme selector (Light, Dark, Glass), accent color picker
    - Personalization: wallpaper manager, desktop icon size
    - Accessibility: font scaling slider, high contrast toggle, keyboard shortcuts list
    - About: version, credits, license

### Phase 6: PWA & Offline Support (Tasks 25-26)

25. **PWA Configuration**
    - Create manifest.json (name, icons, theme_color, background_color)
    - Generate app icons (192x192, 512x512)
    - Service worker: cache static assets, runtime caching for API calls
    - Install prompt component (banner with Install button)
    - Offline fallback page

26. **Service Worker Implementation**
    - Cache strategy: Cache First for static assets, Network First for API
    - Background sync for file operations
    - Push notification support (placeholder)
    - Update notification when new version available

### Phase 7: Internationalization & Accessibility (Tasks 27-28)

27. **i18n Setup (react-i18next)**
    - Create translation files: en.json, hi.json
    - Translate all UI strings (buttons, labels, menus, messages)
    - Language selector in settings
    - RTL support for future languages
    - Number/Date formatting per locale

28. **Accessibility Enhancements**
    - ARIA labels for all interactive elements
    - Keyboard navigation: Tab, Arrow keys, Enter, Escape
    - Focus indicators (2px neon outline)
    - Screen reader announcements for state changes
    - Skip to main content link
    - Reduced motion support (prefers-reduced-motion)

### Phase 8: Testing & Quality (Tasks 29-31)

29. **Unit Tests (Jest + React Testing Library)**
    - Window component: drag, resize, minimize, maximize, close
    - Taskbar component: app switching, context menu
    - File system store: CRUD operations, search
    - Settings store: theme switching, persistence
    - Calculator app: operations, keyboard input

30. **E2E Tests (Playwright)**
    - Test 1: Boot sequence → desktop appears
    - Test 2: Open Notes → type text → save → close → reopen (data persists)
    - Test 3: Open Terminal → run "help" → output appears
    - Test 4: Open App Store → install app → app appears in launcher
    - Test 5: Change theme → settings persist after reload

31. **Performance Optimization**
    - Code splitting: React.lazy for all apps
    - Image optimization: WebP format, lazy loading
    - Memoization: React.memo for expensive components
    - Virtual scrolling for file lists (react-window)
    - Debounce search inputs (300ms)
    - Lighthouse audit: aim for 90+ score

### Phase 9: CI/CD & Deployment (Tasks 32-34)

32. **GitHub Actions Workflow**
    - Trigger: push to main, pull request
    - Jobs: lint → test → build → deploy
    - Lint: ESLint + Prettier check
    - Test: Jest unit tests + Playwright e2e
    - Build: Vite production build
    - Deploy: Vercel deployment (preview for PRs, production for main)

33. **Git Repository Setup**
    - Initialize git repository
    - Create .gitignore (node_modules, dist, .env)
    - Add remote: https://github.com/abhi3114-glitch/WEB-OS-NOVA
    - Configure git credentials with provided token
    - Initial commit with all files
    - Push to main branch

34. **Documentation & README**
    - Project overview and features list
    - Tech stack section
    - Installation instructions (yarn install)
    - Development commands (dev, build, test, e2e, lint, format)
    - Deployment guide (Vercel)
    - Environment variables (.env.example)
    - Screenshots/GIFs of key features
    - Architecture diagram (component hierarchy)
    - Contributing guidelines
    - License (MIT)

### Phase 10: Final Polish (Tasks 35-36)

35. **Widget System**
    - Clock widget: analog/digital toggle, timezone selector
    - Weather widget: mock data with icons (sunny, cloudy, rainy)
    - Notes widget: quick note input, recent notes list
    - Widget manager: add/remove widgets, drag to reposition

36. **Final Testing & Bug Fixes**
    - Cross-browser testing (Chrome, Firefox, Safari, Edge)
    - Responsive testing (desktop, tablet, mobile)
    - Performance profiling (React DevTools)
    - Memory leak detection
    - Fix any lint errors
    - Run full test suite
    - Build production bundle
    - Verify PWA installability

---

## Completion Checklist

- [ ] All dependencies installed
- [ ] All images generated
- [ ] Boot animation works
- [ ] Desktop with icons and wallpaper
- [ ] Window management (drag, resize, minimize, maximize)
- [ ] Taskbar with running apps
- [ ] Start menu with app launcher
- [ ] Command palette (Ctrl+K)
- [ ] File Explorer functional
- [ ] Terminal with mock shell
- [ ] Notes app with auto-save
- [ ] Calculator with keyboard support
- [ ] Image Viewer with zoom
- [ ] Todo app with persistence
- [ ] AI Copilot UI and backend stub
- [ ] App Store with install flow
- [ ] Notifications system
- [ ] Settings panel with themes
- [ ] PWA manifest and service worker
- [ ] Install prompt
- [ ] i18n (English + Hindi)
- [ ] Accessibility features
- [ ] Unit tests passing
- [ ] E2E tests passing
- [ ] GitHub Actions workflow
- [ ] Pushed to GitHub repository
- [ ] Comprehensive README
- [ ] Vercel deployment successful
