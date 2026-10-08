/**
 * main.tsx - the starting point of the real website.
 *
 * When you run `npm run dev`, this is the first file that runs. It does three
 * things: load the design tokens, find the empty <div> in index.html, and
 * draw the HomePage inside it.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Load the generated tokens ONCE, here at the very top of the app. Every
// component below can then use the CSS variables. Without this line the page
// would render with no colours, no spacing and no fonts.
import './styles/tokens.css';

import { HomePage } from './HomePage';

// `document.getElementById('root')` finds <div id="root"> in index.html.
// The `!` tells TypeScript "trust me, this definitely exists".
createRoot(document.getElementById('root')!).render(
  // StrictMode is a development-only helper that warns about common mistakes.
  // It does nothing in the built site.
  <StrictMode>
    <HomePage />
  </StrictMode>,
);
