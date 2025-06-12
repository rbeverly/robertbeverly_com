import init, { Game } from './pkg/conway_wasm.js';

// Sound System
/**
 * Retro-style sound engine for Conway's Game of Life interface
 * Generates authentic 80s computer sound effects using Web Audio API
 */
class RetroSoundEngine {
    constructor() {
        this.audioCtx = null;
        this.masterVolume = 0.15;
    }
    
    getAudioContext() {
        if (!this.audioCtx) {
            try {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn("Web Audio API not supported in this browser");
                return null;
            }
        }
        return this.audioCtx;
    }
    
    playTone(frequency, duration = 100, volume = 1.0, waveType = 'square') {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.type = waveType;
        oscillator.frequency.value = frequency;
        gainNode.gain.value = this.masterVolume * volume;
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
        
        setTimeout(() => {
            oscillator.stop();
        }, duration);
    }
    
    playMenuClick() {
        this.playTone(660, 120, 0.6);
    }
    
    playNavClick() {
        this.playTone(330, 100, 0.7);
    }
    
    playAutoclave() {
        // Low-frequency electrical hum simulation
        this.playTone(60, 300, 0.8, 'sawtooth');
        this.playTone(120, 300, 0.6, 'square');
        
        // High-frequency noise burst for steam effect
        setTimeout(() => {
            this.playNoise(800, 0.4, 'highpass');
        }, 250);
    }
    
    playNoise(duration, volume, filterType = 'lowpass', filterFreq = null) {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        
        const bufferSize = Math.max(ctx.sampleRate * 0.1, ctx.sampleRate * duration / 1000);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = filterType;
        filter.frequency.value = filterFreq || (filterType === 'highpass' ? 2000 : 1000);
        filter.Q.value = filterType === 'bandpass' ? 5 : (filterType === 'highpass' && filterFreq > 3000 ? 2 : 0.5);
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(this.masterVolume * volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
        
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        whiteNoise.start(ctx.currentTime);
        whiteNoise.stop(ctx.currentTime + duration / 1000);
    }
    
    playPopulate() {
        this.playTone(523, 80, 0.6);
        setTimeout(() => this.playTone(659, 80, 0.5), 90);
        setTimeout(() => this.playTone(784, 80, 0.4), 180);
    }
    
    playThemeToggle() {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        
        // Create a sharp click by generating a brief impulse
        const sampleRate = ctx.sampleRate;
        const clickDuration = 0.008; // 8ms
        const bufferLength = Math.floor(sampleRate * clickDuration);
        
        const buffer = ctx.createBuffer(1, bufferLength, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Create a smoother impulse with quick decay
        for (let i = 0; i < bufferLength; i++) {
            const envelope = Math.exp(-i / (bufferLength * 0.2));
            // Smoother noise by averaging multiple random values
            const noise = ((Math.random() + Math.random() + Math.random()) / 3 - 0.5) * 2;
            data[i] = noise * envelope;
        }
        
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        
        const gainNode = ctx.createGain();
        gainNode.gain.value = this.masterVolume * 2.0;
        
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        source.start(ctx.currentTime);
    }
    
    playSliderMove(value) {
        const frequency = 220 + (value * 3);
        this.playTone(frequency, 40, 0.3, 'sine');
    }
    
    playCellPaint() {
        const frequency = 800 + Math.random() * 400;
        this.playTone(frequency, 60, 0.4, 'square');
    }
    
    playPatternDrop() {
        this.playTone(659, 80, 0.7);
        setTimeout(() => this.playTone(523, 80, 0.6), 60);
        setTimeout(() => this.playTone(392, 100, 0.5), 120);
    }
    
    playMemorize() {
        this.playTone(880, 100, 0.6, 'triangle');
        setTimeout(() => this.playTone(1047, 150, 0.4, 'triangle'), 110);
    }
    
    playError() {
        this.playTone(120, 250, 0.8, 'sawtooth');
        setTimeout(() => this.playTone(100, 200, 0.7, 'sawtooth'), 100);
        setTimeout(() => this.playTone(80, 150, 0.6, 'sawtooth'), 200);
    }
}

const soundEngine = new RetroSoundEngine();

// Template
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            // 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0

// Conway's Game of Life Pattern Library
const DEFAULT_PATTERNS = {
    dot: {
        name: "Dot",
        width: 16,
        height: 10,
        cells: [
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    block: {
        name: "Block",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    beehive: {
        name: "Beehive",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    toad: {
        name: "Toad",
        width: 16,
        height: 10,
        cells: [
            0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    glider: {
        name: "Glider",
        width: 16,
        height: 10,
        cells: [
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    // blocks_5x3: {
    //     name: "Blocks 5x3",
    //     width: 16,
    //     height: 10,
    //     cells: [
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    //         0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    //     ],
    //     builtin: true
    // },
    pentadecathlon: {
        name: "Pentadecathlon",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
            1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,
            0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    glider_storm: {
        name: "Glider Storm",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,1,1,1,0,1,1,1,0,0,1,1,
            1,0,1,0,0,1,0,0,0,0,0,1,0,1,0,1,
            1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,
            0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,
            0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,
            0,0,1,1,0,0,0,1,1,1,0,0,0,1,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,
            1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,
            1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1
        ],
        builtin: true
    },
    glider_scatter: {
        name: "Glider Scatter",
        width: 16,
        height: 10,
        cells: [
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
            1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1
        ],
        builtin: true
    },
    lwss: {
        name: "LWSS",
        width: 16,
        height: 10,
        cells: [
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    mwss: {
        name: "MWSS",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    hwss: {
        name: "HWSS",
        width: 16,
        height: 10,
        cells: [
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,
            0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    p3_123: {
        name: "1-2-3 (p3)",
        width: 16,
        height: 10,
        cells: [
            0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,1,0,1,1,0,0,0,0,0,0,
            0,0,1,1,1,0,1,0,1,1,0,0,0,0,0,0,
            0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    two_glider_mess: {
        name: "2-Glider Mess",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    diamond_4_8_12: {
        name: "4-8-12 Diamond",
        width: 16,
        height: 10,
        cells: [
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,
            0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    achims_p8: {
        name: "Achim's p8",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    acorn: {
        name: "Acorn",
        width: 16,
        height: 10,
        cells: [
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    herschel: {
        name: "Herschel",
        width: 16,
        height: 10,
        cells: [
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    karels_p15: {
        name: "Karel's p15",
        width: 16,
        height: 10,
        cells: [
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
            1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,
            1,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
            0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    koks_galaxy: {
        name: "Kok's Galaxy",
        width: 16,
        height: 10,
        cells: [
            0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,
            1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
            0,1,1,1,0,1,0,1,1,0,0,0,0,0,0,0,
            0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    switch_engine_pred: {
        name: "Switch Engine Predecessor",
        width: 16,
        height: 10,
        cells: [
            1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,
            0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    },
    r_pentomino: {
        name: "R-Pentomino",
        width: 16,
        height: 10,
        cells: [
            0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
            1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ],
        builtin: true
    }
};

let userPatterns = {};
let allPatterns = {};
let currentPatternIndex = 0;
let patternKeys = [];
function loadUserPatterns() {
    try {
        const saved = localStorage.getItem('userPatterns');
        userPatterns = saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.warn('Failed to load user patterns:', error);
        userPatterns = {};
    }
}

function saveUserPatterns() {
    try {
        localStorage.setItem('userPatterns', JSON.stringify(userPatterns));
    } catch (error) {
        console.warn('Failed to save user patterns:', error);
    }
}

function isDuplicatePattern(cells, width, height) {
    return Object.values(allPatterns).some(pattern => 
        pattern.width === width && 
        pattern.height === height && 
        arraysEqual(pattern.cells, cells)
    );
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function addUserPattern(name, cells, width, height) {
    if (isDuplicatePattern(cells, width, height)) {
        return { success: false, message: "Organism already saved" };
    }
    
    let key = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    let counter = 1;
    while (allPatterns[key]) {
        key = `${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${counter}`;
        counter++;
    }
    
    userPatterns[key] = {
        name: name,
        width: width,
        height: height,
        cells: [...cells],
        builtin: false
    };
    
    saveUserPatterns();
    updatePatternLibrary();
    return { success: true, message: "Pattern saved successfully" };
}

function updatePatternLibrary() {
    allPatterns = { ...DEFAULT_PATTERNS, ...userPatterns };
    patternKeys = Object.keys(allPatterns);
    if (currentPatternIndex >= patternKeys.length) {
        currentPatternIndex = 0;
    }
}

function getCurrentPattern() {
    if (patternKeys.length === 0) return null;
    return allPatterns[patternKeys[currentPatternIndex]];
}

function nextPattern() {
    if (patternKeys.length > 0) {
        currentPatternIndex = (currentPatternIndex + 1) % patternKeys.length;
    }
}

function previousPattern() {
    if (patternKeys.length > 0) {
        currentPatternIndex = (currentPatternIndex - 1 + patternKeys.length) % patternKeys.length;
    }
}


function placePattern(game, pattern, startX, startY) {
    for (let y = 0; y < pattern.height; y++) {
        for (let x = 0; x < pattern.width; x++) {
            const cellIndex = y * pattern.width + x;
            if (pattern.cells[cellIndex] === 1) {
                const gridX = startX + x;
                const gridY = startY + y;
                if (gridX >= 0 && gridX < game.get_width() && gridY >= 0 && gridY < game.get_height()) {
                    game.set_cell(gridX, gridY, true);
                }
            }
        }
    }
}

// Current display state (separate from pattern library)
let currentDisplayCells = new Array(160).fill(0);

function getCurrentDisplayCells() {
    return [...currentDisplayCells];
}
function setCurrentDisplayCells(cells) {
    currentDisplayCells = [...cells];
}

function updatePatternDisplay(game, cellDisplayGrid) {
    const pattern = getCurrentPattern();
    const cells = cellDisplayGrid.querySelectorAll('.grid-cell');
    const currentTheme = game.get_theme();
    const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
    
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
        cell.style.boxShadow = '';
    });
    
    if (pattern) {
        setCurrentDisplayCells(pattern.cells);
        
        const gridWidth = 16;
        const gridHeight = 10;
        
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                if (currentDisplayCells[y * gridWidth + x] === 1) {
                    const cellIndex = y * gridWidth + x;
                    if (cellIndex < cells.length) {
                        cells[cellIndex].style.backgroundColor = themeColor;
                        cells[cellIndex].style.boxShadow = `0 0 2px ${themeColor}`;
                    }
                }
            }
        }
    }
}

// Enhanced repopulate using pattern library
function enhancedRepopulate(game) {
    const gridWidth = game.get_width();
    const gridHeight = game.get_height();
    const sectionWidth = 16;
    const sectionHeight = 10;
    
    const sectionsX = Math.floor(gridWidth / sectionWidth);
    const sectionsY = Math.floor(gridHeight / sectionHeight);
    
    let patternsPlaced = 0;
    
    // For each complete 16x10 section, 6% chance to place a random pattern
    for (let sy = 0; sy < sectionsY; sy++) {
        for (let sx = 0; sx < sectionsX; sx++) {
            if (Math.random() < 0.06) {
                const patterns = Object.values(allPatterns);
                if (patterns.length > 0) {
                    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
                    
                    const sectionStartX = sx * sectionWidth;
                    const sectionStartY = sy * sectionHeight;
                    
                    placePattern(game, pattern, sectionStartX, sectionStartY);
                    patternsPlaced++;
                }
            }
        }
    }
    
    if (patternsPlaced === 0 && sectionsX > 0 && sectionsY > 0) {
        const patterns = Object.values(allPatterns);
        if (patterns.length > 0) {
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            const sx = Math.floor(Math.random() * sectionsX);
            const sy = Math.floor(Math.random() * sectionsY);
            const sectionStartX = sx * sectionWidth;
            const sectionStartY = sy * sectionHeight;
            placePattern(game, pattern, sectionStartX, sectionStartY);
        }
    }
    
    const sparseChance = 0.15;
    
    const rightEdgeStart = sectionsX * sectionWidth;
    if (rightEdgeStart < gridWidth) {
        for (let x = rightEdgeStart; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                if (Math.random() < sparseChance) {
                    game.set_cell(x, y, true);
                }
            }
        }
    }
    
    const bottomEdgeStart = sectionsY * sectionHeight;
    if (bottomEdgeStart < gridHeight) {
        for (let y = bottomEdgeStart; y < gridHeight; y++) {
            for (let x = 0; x < rightEdgeStart; x++) {
                if (Math.random() < sparseChance) {
                    game.set_cell(x, y, true);
                }
            }
        }
    }
}

async function run() {
    await init();
    const game = new Game();
    const canvas = document.getElementById('gameCanvas');
    
    loadUserPatterns();
    updatePatternLibrary();
    
    
    function resizeCanvas() {
        const crtScreen = document.querySelector('.crt-screen');
        const rect = crtScreen.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        game.resize(rect.width, rect.height);
    }

    function resizeCanvasPreserve() {
        const crtScreen = document.querySelector('.crt-screen');
        const rect = crtScreen.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        game.resize_preserve(rect.width, rect.height);
    }

    resizeCanvas();

    window.addEventListener('resize', () => {
        resizeCanvasPreserve();
        if (menuVisible) {
            renderMenu();
        } else {
            game.render('gameCanvas');
        }
    });

    let animationFrameId = null;
    let lastUpdate = performance.now();
    let updateInterval = 100; // 100ms for 10 updates per second
    let isMouseDown = false;
    let lastAutoSave = performance.now();
    let isInitializing = true;

    function getGridCoordinates(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((event.clientX - rect.left) * scaleX / 3);
        const y = Math.floor((event.clientY - rect.top) * scaleY / 3);
        return { x, y };
    }

    function paintCell(event) {
        soundEngine.playCellPaint();
        const { x, y } = getGridCoordinates(event);
        game.set_cell(x, y, true);
        game.render('gameCanvas');
        
        clearTimeout(window.paintSaveTimeout);
        window.paintSaveTimeout = setTimeout(() => {
            saveGameState();
        }, 500);
    }

    function handleCanvasClick(event) {
        const displayCells = getCurrentDisplayCells();
        if (displayCells && displayCells.some(cell => cell === 1)) {
            soundEngine.playPatternDrop();
            const displayPattern = {
                cells: displayCells,
                width: 16,
                height: 10
            };
            
            const { x, y } = getGridCoordinates(event);
            placePattern(game, displayPattern, x, y);
            game.render('gameCanvas');
            saveGameState();
        } else {
            paintCell(event);
        }
    }

    function gameMouseDown(event) {
        isMouseDown = true;
        handleCanvasClick(event);
    }

    function gameMouseMove(event) {
        if (isMouseDown) {
            paintCell(event);
        }
    }

    function gameMouseUp() {
        isMouseDown = false;
    }

    function gameMouseLeave() {
        isMouseDown = false;
    }

    let hoveredMenuIndex = -1;
    let menuClickAreas = [];

    function setCanvasMode(isMenuMode) {
        if (isMenuMode) {
            canvas.removeEventListener('mousedown', gameMouseDown);
            canvas.removeEventListener('mousemove', gameMouseMove);
            canvas.removeEventListener('mouseup', gameMouseUp);
            canvas.removeEventListener('mouseleave', gameMouseLeave);
            
            canvas.style.cursor = 'default';
        } else {
            hoveredMenuIndex = -1;
            const existingOverlays = document.querySelectorAll('.menu-hover-overlay');
            existingOverlays.forEach(overlay => overlay.remove());
            
            if (window.menuHoverInterval) {
                clearInterval(window.menuHoverInterval);
                window.menuHoverInterval = null;
            }
            if (window.menuMouseTracker) {
                document.removeEventListener('mousemove', window.menuMouseTracker);
                window.menuMouseTracker = null;
            }
            
            canvas.style.cursor = 'crosshair';
            
            canvas.addEventListener('mousedown', gameMouseDown);
            canvas.addEventListener('mousemove', gameMouseMove);
            canvas.addEventListener('mouseup', gameMouseUp);
            canvas.addEventListener('mouseleave', gameMouseLeave);
        }
    }

    setCanvasMode(false);
    

    function gameLoop() {
        if (game.is_running()) {
            const currentTime = performance.now();
            if (currentTime - lastUpdate >= updateInterval) {
                game.update();
                lastUpdate = currentTime;
                
                if (currentTime - lastAutoSave >= 30000) {
                    saveGameState();
                    lastAutoSave = currentTime;
                }
            }
            game.render('gameCanvas');
            animationFrameId = requestAnimationFrame(gameLoop);
        }
    }

    const enzymeSlider = document.getElementById('enzymeSlider');
    const enzymeDisplay = document.getElementById('enzymeDisplay');
    const autoclaveButton = document.getElementById('autoclaveButton');
    const repopulateButton = document.getElementById('repopulateButton');
    const sampleButton = document.getElementById('sampleButton');
    const autoclaveLed = document.getElementById('autoclaveLed');
    const repopulateLed = document.getElementById('repopulateLed');
    const sampleLed = document.getElementById('sampleLed');
    const themeSwitch = document.getElementById('themeSwitch');
    const amberLabel = document.querySelector('.amber-label');
    const greenLabel = document.querySelector('.green-label');
    const menuButton = document.getElementById('menuButton');
    const menuLed = document.getElementById('menuLed');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const cellDisplayGrid = document.getElementById('cellDisplayGrid');

    const menuItems = [
        { text: 'Home', url: '/', external: false },
        { text: 'Industrious Kraken', url: 'https://industriouskraken.com/', external: true },
        { text: 'Andy Beverly School', url: 'https://andybeverly.com/', external: true },
        { text: 'My LinkedIn', url: 'https://www.linkedin.com/in/robertbeverly/', external: true }
    ];

    let menuVisible = false;

    function toggleMenu() {
        menuVisible = !menuVisible;
        if (menuVisible) {
            menuLed.classList.remove('off');
            menuLed.classList.add('blinking');
            if (game.is_running()) {
                game.stop();
                if (animationFrameId !== null) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
            setCanvasMode(true);
            renderMenu();
        } else {
            menuLed.classList.remove('blinking');
            menuLed.classList.add('off');
            setCanvasMode(false);
            const enzymeLevel = parseInt(enzymeSlider.value);
            if (enzymeLevel > 0) {
                updateGameSpeed(enzymeLevel);
            } else {
                game.render('gameCanvas');
            }
        }
    }

    // Function to render menu on canvas
    function renderMenu() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const currentTheme = game.get_theme();
        const textColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        menuClickAreas = [];
        
        const existingOverlays = document.querySelectorAll('.menu-hover-overlay');
        existingOverlays.forEach(overlay => overlay.remove());
        
        const fontSize = 16;
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = textColor;
        ctx.shadowBlur = 4;
        
        const lineHeight = 24;
        const startY = 40;
        const textX = 20;
        
        menuItems.forEach((item, index) => {
            const y = startY + (index * lineHeight);
            
            const textMetrics = ctx.measureText(item.text);
            const textWidth = textMetrics.width;
            const textHeight = fontSize;
            
            const padding = 2;
            const topPadding = 2;
            const charWidth = ctx.measureText('M').width;
            const clickArea = {
                x: textX - padding,
                y: y,
                width: textWidth + (padding * 2) + charWidth,
                height: textHeight + padding + topPadding
            };
            menuClickAreas.push(clickArea);
            
            const overlay = document.createElement('div');
            overlay.className = 'menu-hover-overlay';
            overlay.style.position = 'absolute';
            overlay.style.pointerEvents = 'auto';
            overlay.style.cursor = 'pointer';
            overlay.style.zIndex = '1000';
            
            overlay.dataset.menuIndex = index;
            
            const canvasRect = canvas.getBoundingClientRect();
            const rectY = clickArea.y - clickArea.height/2 - 1;
            overlay.style.left = `${canvasRect.left + (clickArea.x * canvasRect.width / canvas.width)}px`;
            overlay.style.top = `${canvasRect.top + (rectY * canvasRect.height / canvas.height)}px`;
            overlay.style.width = `${(clickArea.width * canvasRect.width / canvas.width)}px`;
            overlay.style.height = `${(clickArea.height * canvasRect.height / canvas.height)}px`;
            
            overlay.addEventListener('click', () => {
                const menuItem = menuItems[index];
                if (menuItem.external) {
                    window.open(menuItem.url, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = menuItem.url;
                }
                toggleMenu();
            });
            
            document.body.appendChild(overlay);
            
            if (index === hoveredMenuIndex) {
                ctx.save();
                const rectY = clickArea.y - clickArea.height/2 - 1;
                
                ctx.fillStyle = `${textColor}40`;
                ctx.fillRect(clickArea.x, rectY, clickArea.width, clickArea.height);
                
                ctx.strokeStyle = textColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(clickArea.x, rectY, clickArea.width, clickArea.height);
                
                ctx.restore();
            }
            
            ctx.fillStyle = textColor;
            ctx.shadowColor = textColor;
            ctx.shadowBlur = index === hoveredMenuIndex ? 6 : 4;
            
            ctx.fillText(item.text, textX, y);
        });
        
        ctx.shadowBlur = 0;
        
        window.menuClickAreas = menuClickAreas;
        
        if (!window.menuMouseTracker) {
            let lastMouseX = 0;
            let lastMouseY = 0;
            
            window.menuMouseTracker = (event) => {
                lastMouseX = event.clientX;
                lastMouseY = event.clientY;
            };
            
            document.addEventListener('mousemove', window.menuMouseTracker);
            
            // Poll to check if mouse is over any menu area
            window.menuHoverInterval = setInterval(() => {
                const canvasRect = canvas.getBoundingClientRect();
                
                const canvasX = (lastMouseX - canvasRect.left) * (canvas.width / canvasRect.width);
                const canvasY = (lastMouseY - canvasRect.top) * (canvas.height / canvasRect.height);
                
                let newHoveredIndex = -1;
                
                menuItems.forEach((item, index) => {
                    const y = 40 + (index * 24);
                    const textMetrics = ctx.measureText(item.text);
                    const textWidth = textMetrics.width;
                    const charWidth = ctx.measureText('M').width;
                    
                    const clickArea = {
                        x: 20 - 2,
                        y: y,
                        width: textWidth + 4 + charWidth,
                        height: 16 + 4
                    };
                    
                    const rectY = clickArea.y - clickArea.height/2 - 1;
                    
                    if (canvasX >= clickArea.x && canvasX <= clickArea.x + clickArea.width && 
                        canvasY >= rectY && canvasY <= rectY + clickArea.height) {
                        newHoveredIndex = index;
                    }
                });
                
                if (newHoveredIndex !== hoveredMenuIndex) {
                    hoveredMenuIndex = newHoveredIndex;
                    renderMenu();
                }
            }, 100);
        }
    }

    function blinkLed(led) {
        led.classList.remove('off');
        led.classList.add('blinking');
        
        setTimeout(() => {
            led.classList.remove('blinking');
            led.classList.add('off');
        }, 3000);
    }
    
    function blinkLedRed(led) {
        const wasGreen = led.classList.contains('green');
        led.classList.remove('off');
        if (wasGreen) {
            led.classList.remove('green');
        }
        led.classList.add('blinking-red');
        
        setTimeout(() => {
            led.classList.remove('blinking-red');
            if (wasGreen) {
                led.classList.add('green');
            }
            led.classList.add('off');
        }, 3000);
    }

    function updateGameSpeed(enzymeLevel) {
        if (enzymeLevel === 0) {
            game.stop();
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        } else {
            updateInterval = 999 - (enzymeLevel - 1) * (989 / 98);
            
            if (!game.is_running()) {
                game.start();
                lastUpdate = performance.now();
                gameLoop();
            }
        }
    }

    function updateSliderMarks(value) {
        const marks = document.querySelectorAll('.slider-marks span');
        const currentTheme = game.get_theme();
        const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        
        const markPositions = [0, 24.75, 49.5, 74.25, 99];
        
        marks.forEach((mark, index) => {
            const markPosition = markPositions[index];
            const distance = Math.abs(value - markPosition);
            
            let brightness = 0;
            if (distance <= 12.375) {
                if (distance === 0) {
                    brightness = 1.0;
                } else if (distance <= 6.1875) {
                    brightness = 0.75;
                } else {
                    brightness = 0.5 - (distance - 6.1875) / 12.375 * 0.5;
                }
            }
            
            if (brightness > 0) {
                mark.style.color = themeColor;
                mark.style.textShadow = `0 0 ${2 + brightness * 2}px ${themeColor}`;
                mark.style.opacity = Math.max(0.3, brightness);
            } else {
                mark.style.color = '#665542';
                mark.style.textShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
                mark.style.opacity = '1';
            }
        });
    }

    enzymeSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        soundEngine.playSliderMove(value);
        enzymeDisplay.textContent = value;
        updateGameSpeed(value);
        updateSliderMarks(value);
        saveState();
    });

    autoclaveButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    autoclaveButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    autoclaveButton.addEventListener('click', function() {
        soundEngine.playAutoclave();
        game.clear();
        game.render('gameCanvas');
        blinkLed(autoclaveLed);
        saveGameState();
    });

    repopulateButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    repopulateButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    repopulateButton.addEventListener('click', function() {
        soundEngine.playPopulate();
        enhancedRepopulate(game);
        game.render('gameCanvas');
        blinkLed(repopulateLed);
        saveGameState();
    });

    sampleButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    sampleButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    sampleButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    prevButton.addEventListener('click', function() {
        soundEngine.playNavClick();
        previousPattern();
        updatePatternDisplay(game, cellDisplayGrid);
    });

    nextButton.addEventListener('click', function() {
        soundEngine.playNavClick();
        nextPattern();
        updatePatternDisplay(game, cellDisplayGrid);
    });
    
    cellDisplayGrid.addEventListener('click', function(event) {
        if (event.target.classList.contains('grid-cell')) {
            soundEngine.playCellPaint();
            const cells = cellDisplayGrid.querySelectorAll('.grid-cell');
            const cellIndex = Array.from(cells).indexOf(event.target);
            
            if (cellIndex >= 0 && cellIndex < currentDisplayCells.length) {
                currentDisplayCells[cellIndex] = currentDisplayCells[cellIndex] === 1 ? 0 : 1;
                
                const currentTheme = game.get_theme();
                const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
                
                if (currentDisplayCells[cellIndex] === 1) {
                    event.target.style.backgroundColor = themeColor;
                    event.target.style.boxShadow = `0 0 2px ${themeColor}`;
                } else {
                    event.target.style.backgroundColor = '';
                    event.target.style.boxShadow = '';
                }
            }
        }
    });

    sampleButton.addEventListener('click', function() {
        const displayCells = getCurrentDisplayCells();
        if (displayCells && displayCells.some(cell => cell === 1)) {
            const timestamp = Date.now();
            const result = addUserPattern(`Custom_${timestamp}`, displayCells, 16, 10);
            
            if (result.success) {
                soundEngine.playMemorize();
                console.log(result.message);
                blinkLed(sampleLed);
            } else {
                soundEngine.playError();
                console.log(result.message);
                blinkLedRed(sampleLed);
            }
        } else {
            soundEngine.playError();
            console.log("No pattern to memorize - display is empty");
            blinkLedRed(sampleLed);
        }
    });

    function updateTheme(theme) {
        const root = document.documentElement;
        game.set_theme(theme);
        
        if (theme === 'amber') {
            root.style.setProperty('--current-cell-color', '#FFB000');
            root.style.setProperty('--current-canvas-bg', '#0D0A05');
            canvas.style.backgroundColor = '#0D0A05';
            themeSwitch.className = 'rotary-switch amber';
            amberLabel.classList.add('active');
            greenLabel.classList.remove('active');
            enzymeDisplay.classList.remove('green');
            enzymeDisplay.style.color = '#FFB000';
            enzymeDisplay.style.textShadow = '0 0 4px #FFB000';
        } else {
            root.style.setProperty('--current-cell-color', '#AAFFBB');
            root.style.setProperty('--current-canvas-bg', '#000000');
            canvas.style.backgroundColor = '#000000';
            themeSwitch.className = 'rotary-switch green';
            greenLabel.classList.add('active');
            amberLabel.classList.remove('active');
            enzymeDisplay.classList.add('green');
            enzymeDisplay.style.color = '';
            enzymeDisplay.style.textShadow = '';
        }
        
        game.render('gameCanvas');
        
        updateSliderMarks(parseInt(enzymeSlider.value));
        
        // Update only the colors of existing cells without resetting the pattern
        const cells = cellDisplayGrid.querySelectorAll('.grid-cell');
        const currentTheme = game.get_theme();
        const themeColor = currentTheme === 'amber' ? '#FFB000' : '#AAFFBB';
        
        cells.forEach((cell, index) => {
            if (currentDisplayCells[index] === 1) {
                cell.style.backgroundColor = themeColor;
                cell.style.boxShadow = `0 0 2px ${themeColor}`;
            }
        });
        
        saveState();
    }

    menuButton.addEventListener('mousedown', function() {
        this.classList.add('active');
    });

    menuButton.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });

    menuButton.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    });

    menuButton.addEventListener('click', function() {
        soundEngine.playMenuClick();
        
        // Delay menu toggle to avoid interfering with audio
        setTimeout(() => {
            toggleMenu();
        }, 10);
    });

    themeSwitch.addEventListener('click', function() {
        soundEngine.playThemeToggle();
        
        // Delay theme update to avoid interfering with audio
        setTimeout(() => {
            const currentTheme = game.get_theme();
            const newTheme = currentTheme === 'amber' ? 'green' : 'amber';
            updateTheme(newTheme);
        }, 10);
    });

    function saveGameState() {
        if (isInitializing) {
            return;
        }
        
        try {
            const gridState = game.get_grid_state();
            const gameState = {
                grid: Array.from(gridState),
                width: game.get_width(),
                height: game.get_height(),
                running: game.is_running(),
                theme: game.get_theme(),
                enzymeLevel: parseInt(enzymeSlider.value)
            };
            localStorage.setItem('gameOfLifeState', JSON.stringify(gameState));
        } catch (error) {
            console.warn('Failed to save game state:', error);
        }
    }

    function loadGameState() {
        try {
            const savedState = localStorage.getItem('gameOfLifeState');
            if (savedState) {
                const state = JSON.parse(savedState);
                const currentWidth = game.get_width();
                const currentHeight = game.get_height();
                
                if (state.grid && state.width && state.height) {
                    if (state.width === currentWidth && state.height === currentHeight) {
                        let gridArray;
                        if (Array.isArray(state.grid)) {
                            gridArray = state.grid;
                        } else {
                            gridArray = Object.values(state.grid);
                        }
                        game.set_grid_state(gridArray);
                    } else {
                        const newGrid = new Array(currentWidth * currentHeight).fill(0);
                        const copyWidth = Math.min(state.width, currentWidth);
                        const copyHeight = Math.min(state.height, currentHeight);
                        
                        let oldGridArray;
                        if (Array.isArray(state.grid)) {
                            oldGridArray = state.grid;
                        } else {
                            oldGridArray = Object.values(state.grid);
                        }
                        
                        for (let i = 0; i < copyHeight; i++) {
                            for (let j = 0; j < copyWidth; j++) {
                                const oldIdx = i * state.width + j;
                                const newIdx = i * currentWidth + j;
                                if (oldIdx < oldGridArray.length) {
                                    newGrid[newIdx] = oldGridArray[oldIdx];
                                }
                            }
                        }
                        
                        game.set_grid_state(newGrid);
                    }
                }
                
                if (state.running) {
                    game.start();
                } else {
                    game.stop();
                }
                
                return true;
            }
        } catch (error) {
            console.warn('Failed to load game state:', error);
        }
        return false;
    }

    function loadSavedState() {
        const savedEnzymeLevel = localStorage.getItem('enzymeLevel');
        const savedTheme = localStorage.getItem('theme');
        
        const enzymeLevel = savedEnzymeLevel ? parseInt(savedEnzymeLevel) : 10;
        enzymeSlider.value = enzymeLevel;
        enzymeDisplay.textContent = enzymeLevel;
        updateGameSpeed(enzymeLevel);
        updateSliderMarks(enzymeLevel);
        
        const theme = savedTheme || 'amber';
        updateTheme(theme);
        
        const gameStateLoaded = loadGameState();
        
        if (!gameStateLoaded) {
            enhancedRepopulate(game);
        }
        
        game.render('gameCanvas');
        
        updatePatternDisplay(game, cellDisplayGrid);
        
        isInitializing = false;
    }
    
    function saveState() {
        localStorage.setItem('enzymeLevel', enzymeSlider.value);
        localStorage.setItem('theme', game.get_theme());
        saveGameState();
    }
    
    loadSavedState();
    
}

run();
