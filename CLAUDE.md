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
   - Dynamic grid resizing based on canvas dimensions
   - 3x3 pixel cell rendering with glow effects

2. **Frontend Interface** (`www/index.js`): JavaScript application controller
   - Initializes WASM module and manages game lifecycle
   - Handles mouse interaction for cell painting
   - Controls game speed via enzyme slider (0-99 maps to 999-10ms intervals)
   - Manages retro control panel interactions (buttons, LEDs, theme switching)

3. **Retro UI System** (`www/style.css`): CRT monitor and control panel styling
   - 80x46px grid-based control panel layout
   - CRT display effects (scanlines, phosphor glow, bezel)
   - Responsive design (top controls on portrait, sidebar on landscape)

### Key Integration Points

- **Canvas Rendering**: WASM directly draws to HTML5 canvas with theme-aware colors
- **Control Bindings**: JavaScript event handlers call WASM methods for game control
- **Theme System**: Synchronized between WASM rendering and CSS variables
- **Responsive Canvas**: Auto-resizes game grid based on CRT screen container dimensions

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