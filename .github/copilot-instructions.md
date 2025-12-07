# Dojo Nutrition Widget - AI Instructions

## Project Overview
This is a lightweight, client-side web application for nutrition tracking. It uses vanilla JavaScript, HTML, and CSS (Tailwind via CDN). There is no build step; the application runs directly in the browser.

## Architecture & Data Flow
- **Entry Points**: Individual HTML files (`index.html`, `pantry.html`, `dish.html`) serve as distinct views.
- **Shared Logic**: `logic.js` contains the core business logic (API calls are disabled/stubbed) and unit conversions (`toGrams`).
- **State Management**: The app relies entirely on `localStorage` for persistence.
  - `dojo_dishes`: Array of dish objects (recipes).
  - `dojo_pantry`: Array of pantry items (ingredients).
  - `dojo_api_key`: API key for the nutrition service.
- **Styling**: 
  - **Tailwind CSS**: Used for layout and utility classes (via CDN).
  - **Custom Theme**: `dojo.css` defines the unique "Dojo" look (fonts, backgrounds, textures). Key classes include `.paper-stone`, `.hand-font`, `.burned-text`.

## Critical Workflows
- **Setup**: 
  - Nutrition API calls are currently disabled/stubbed; no API key is required.
- **Running**: Open any `.html` file in a browser. Using a local server (e.g., VS Code Live Server or `python -m http.server`) is recommended to avoid CORS issues with some local file operations.
- **Debugging**: Use the browser's developer console. There are no automated tests.

## Code Conventions
- **JavaScript**:
  - Use modern ES6+ syntax (async/await, arrow functions).
  - Keep logic simple and functional.
  - Avoid external dependencies unless necessary (currently only Tailwind).
- **HTML/CSS**:
  - Use semantic HTML where possible.
  - Prefer Tailwind classes for layout (margins, padding, flexbox).
  - Use custom classes from `dojo.css` for thematic elements (cards, typography).
- **Naming**:
  - `localStorage` keys are prefixed with `dojo_`.
  - CSS classes for the theme use kebab-case (e.g., `paper-stone`).

## Key Files
- `logic.js`: The "brain" of the app. Handles data fetching and normalization.
- `dojo.css`: The "soul" of the app. Contains the visual identity.
- `index.html`: The main search interface.
- `dish.js` / `pantry.js`: Logic for managing specific data entities.
