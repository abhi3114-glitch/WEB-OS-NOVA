import { useWindowStore, WindowState } from '@/stores/windowStore';
import { motion } from 'framer-motion';
import { Minus, Maximize2, X, Minimize2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import interact from 'interactjs';

interface WindowProps {
  window: WindowState;
  children?: React.ReactNode;
}

export default function Window({ window, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const isActive = activeWindowId === window.id;

  useEffect(() => {
    if (!windowRef.current || window.isMinimized) return;

    const element = windowRef.current;

    // Make window draggable
    interact(element).draggable({
      allowFrom: '.window-header',
      listeners: {
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x') || '0') || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y') || '0') || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x.toString());
          target.setAttribute('data-y', y.toString());

          updateWindowPosition(window.id, {
            x: window.position.x + event.dx,
            y: window.position.y + event.dy,
          });
        },
        end(event) {
          const screenWidth = window.innerWidth;
          const { clientX } = event;

          // Simple snapping logic
          if (clientX < 20) {
            // Snap Left
            updateWindowPosition(window.id, { x: 0, y: 0 });
            updateWindowSize(window.id, { width: screenWidth / 2, height: window.innerHeight - 48 });
          } else if (clientX > screenWidth - 20) {
            // Snap Right
            updateWindowPosition(window.id, { x: screenWidth / 2, y: 0 });
            updateWindowSize(window.id, { width: screenWidth / 2, height: window.innerHeight - 48 });
          }
        }
      },
    });

    // Make window resizable
    interact(element).resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      listeners: {
        move(event) {
          const target = event.target;
          let x = parseFloat(target.getAttribute('data-x') || '0') || 0;
          let y = parseFloat(target.getAttribute('data-y') || '0') || 0;

          target.style.width = `${event.rect.width}px`;
          target.style.height = `${event.rect.height}px`;

          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x.toString());
          target.setAttribute('data-y', y.toString());

          updateWindowSize(window.id, {
            width: event.rect.width,
            height: event.rect.height,
          });
        },
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 400, height: 300 },
        }),
      ],
    });

    return () => {
      interact(element).unset();
    };
  }, [window.id, window.isMinimized]);

  if (window.isMinimized) {
    return null;
  }

  const handleMaximize = () => {
    if (window.isMaximized) {
      restoreWindow(window.id);
    } else {
      maximizeWindow(window.id);
    }
  };

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`fixed rounded-2xl overflow-hidden shadow-2xl ${isActive ? 'ring-2 ring-[#FF006E]' : ''
        }`}
      style={{
        left: window.isMaximized ? 0 : window.position.x,
        top: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 60px)' : window.size.height,
        zIndex: window.zIndex,
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseDown={() => focusWindow(window.id)}
    >
      {/* Window Header */}
      <div className="window-header flex items-center justify-between px-4 h-12 bg-gradient-to-r from-[#FF006E]/20 to-[#00F5FF]/20 border-b border-white/10 cursor-move">
        <div className="flex items-center gap-3">
          {window.icon && (
            <img src={window.icon} alt="" className="w-5 h-5 object-contain" />
          )}
          <span className="text-white font-medium text-sm">{window.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            {window.isMaximized ? (
              <Minimize2 className="w-4 h-4 text-white" />
            ) : (
              <Maximize2 className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={() => closeWindow(window.id)}
            className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-3rem)] overflow-auto bg-[#0A0A0A]">
        {children || window.content}
      </div>
    </motion.div>
  );
}