import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import './scss/app.scss';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <Router>
    <App />
  </Router>
);
