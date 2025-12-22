# Flashify Frontend

<p align="center">
  <img src="https://vuejs.org/logo.svg" alt="Vue.js Logo" width="100">
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen" alt="Node.js Version"></a>
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-3.5.25-brightgreen" alt="Vue Version"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-7.2.4-646CFF" alt="Vite Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
</p>

Flashify is a modern flashcards application built with Vue 3 and Vite. This frontend provides an intuitive interface for creating, managing, and studying flashcards.

## Backend

The backend for this application can be found at [Flashify Backend](https://github.com/FlareItsh/Flashify-Backend.git).

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 20.19.0 or higher, or 22.12.0 or higher (check with `node --version`)
- **npm**: Comes with Node.js (check with `npm --version`)
- **Git**: For cloning the repository

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/FlareItsh/Flashify.git
   cd Flashify
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

## Running Locally

To start the development server:

```sh
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal) to view the application.

The development server supports hot reloading, so changes to your code will be reflected immediately in the browser.

## Building for Production

To build the application for production:

```sh
npm run build
```

This will create a `dist` folder with the optimized production build.

To preview the production build locally:

```sh
npm run preview
```

## Additional Commands

- **Type checking**: `npm run type-check`
- **Linting**: `npm run format` (uses Prettier to format code)

## Development Setup

### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Structure

- `src/components/`: Reusable Vue components
- `src/pages/`: Page components for routing
- `src/composables/`: Vue composables for shared logic
- `src/services/`: API service functions
- `src/router/`: Vue Router configuration
- `src/layouts/`: Layout components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run format` to format code
5. Test your changes
6. Submit a pull request

## License

This project is licensed under the MIT License.
