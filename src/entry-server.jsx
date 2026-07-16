// Server entry for build-time prerendering (see prerender.mjs).
// Renders the same <App/> the browser hydrates, so the static HTML
// in dist/index.html can never drift from the live site.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(<App />);
}
