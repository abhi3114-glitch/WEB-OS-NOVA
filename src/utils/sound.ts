// Simple sound utility using browser Audio API

const SOUNDS = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft click
    notification: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3', // Bell
    error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Error beep
    startup: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3', // Startup chime
};

class SoundManager {
    private audioCache: { [key: string]: HTMLAudioElement } = {};
    private enabled: boolean = true;

    constructor() {
        // Preload sounds
        Object.entries(SOUNDS).forEach(([key, url]) => {
            this.audioCache[key] = new Audio(url);
            this.audioCache[key].volume = 0.5;
        });
    }

    play(sound: keyof typeof SOUNDS) {
        if (!this.enabled) return;

        const audio = this.audioCache[sound];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {
                // Ignore autoplay errors
            });
        }
    }

    toggle(enabled: boolean) {
        this.enabled = enabled;
    }
}

export const soundManager = new SoundManager();
