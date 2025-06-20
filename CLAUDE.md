# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

- Always respect the grid system documented in README.md when implementing controls.
- When running an http server, run it from www.
- Always check which branches exist already, and branch off of dev unless otherwise specified.
- Only put information about project changes in commit messages, and never advertise claude in them.

## Build Commands

### WASM Build
```bash
# Build the Rust WASM module (run from project root)
wasm-pack build --target web --out-dir pkg

# Copy WASM files to www directory
cp -r pkg/* www/pkg/
```

### Development Server
```bash
# Serve the application (run from www directory)
python3 -m http.server 8000
# or
npx serve .
```

## Architecture Overview

This is a Conway's Game of Life implementation with a retro-styled control panel interface. The architecture consists of:

### Core Components

1. **WASM Game Engine** (`src/lib.rs`): Rust-based Conway's Game of Life implementation
   - Handles game state, updates, and canvas rendering
   - Supports theme switching (amber/green phosphor)
   - Dynamic grid resizing with state preservation (`resize_preserve` method)
   - 3x3 pixel cell rendering with glow effects

2. **Frontend Interface** (`www/index.js`): JavaScript application controller
   - Initializes WASM module and manages game lifecycle
   - Handles mouse interaction for cell painting and pattern placement
   - Controls game speed via enzyme slider (0-99 maps to 999-10ms intervals)
   - Manages retro control panel interactions (buttons, LEDs, theme switching)
   - Canvas-based navigation menu system with hover effects
   - Pattern library system with 20+ classic Conway's Game of Life patterns
   - Enhanced population system using structured pattern placement

3. **Retro UI System** (`www/style.css`): CRT monitor and control panel styling
   - 80x46px grid-based control panel layout with compact menu button
   - CRT display effects (scanlines, phosphor glow, bezel)
   - Responsive design (top controls on portrait, sidebar on landscape)

### Key Integration Points

- **Canvas Rendering**: WASM directly draws to HTML5 canvas with theme-aware colors
- **Control Bindings**: JavaScript event handlers call WASM methods for game control
- **Theme System**: Synchronized between WASM rendering and CSS variables
- **Adaptive Canvas**: Auto-resizes game grid with state preservation during window resize
- **Menu System**: Canvas-based navigation with HTML overlay hover detection and SEO-friendly hidden links
- **Pattern System**: 16x10 pattern library with cycling navigation and click-to-place functionality
- **Smart Population**: Enhanced populate function places patterns in 16x10 sections with 6% probability

### File Structure
```
src/lib.rs              # WASM game engine
www/
├── index.html          # Main application page
├── index.js            # Frontend controller
├── style.css           # UI styling and grid system
├── pkg/               # WASM build output
└── widgets/           # Grid system test components
```

The application uses a fixed 3x3 pixel cell size for consistent visual appearance across different screen sizes.

## Pattern System

### Pattern Library
- All patterns stored as 16x10 grids positioned at top-left for easy placement
- Includes 20+ classic patterns: Block, Glider, LWSS, Pulsar, Acorn, R-Pentomino, etc.
- User patterns can be saved to localStorage (framework ready)

### Controls
- **Arrow Buttons**: Cycle through pattern library
- **MEMORIZE Button**: Select current pattern for placement
- **Click Canvas**: Place memorized pattern at cursor location
- **POPULATE Button**: Enhanced randomization using pattern library

### Pattern Format
```javascript
pattern_name: {
    name: "Display Name",
    width: 16,
    height: 10,
    cells: [160 values: 1=alive, 0=dead],
    builtin: true
}
```