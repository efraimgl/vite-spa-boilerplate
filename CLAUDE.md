# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal Vite-based single-page application for brain wave analysis (Neural Sync). This is a vanilla JavaScript SPA with no framework dependencies, built as an extensible boilerplate.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Application Structure

This is a **vanilla JavaScript SPA** with client-side rendering:

- **Single-file architecture**: The entire application is rendered via `src/main.js:renderApp()` which dynamically generates the DOM structure as a single HTML string
- **State management**: Simple global state object (`state`) in main.js tracks connection status and brain wave data
- **No routing**: Single-page application without client-side routing (all navigation is anchor-based)
- **Event-driven updates**: UI updates triggered by state changes via direct DOM manipulation

### Key Application Flow

1. `renderApp()` generates complete HTML structure and injects into `#app`
2. Event listeners attached after DOM injection (e.g., connect button)
3. `toggleConnection()` manages connection state and UI updates
4. `simulateBrainWaveData()` runs on interval when connected, updates metrics via `updateMetrics()`

### Important Implementation Notes

- **State updates are imperative**: No reactive framework - state changes must manually trigger DOM updates via helper functions
- **Event listeners must be re-attached**: After `renderApp()` or any innerHTML replacement, event listeners need to be rebound
- **Interval management issue**: Line 58 in main.js creates a new interval on each connect without clearing previous intervals - this causes memory leaks on repeated connections

### Styling

- Apple-inspired design system with glassmorphic header (backdrop-filter)
- CSS Grid for responsive layouts (features grid, metrics grid)
- No CSS framework or preprocessor - vanilla CSS with custom properties in `:root`

## Extending This Boilerplate

When adding features:
- Import new modules at the top of `src/main.js`
- Add new state properties to the `state` object
- Create helper functions for state updates and DOM manipulation
- Consider refactoring to component-based architecture if app grows beyond single-file scope
