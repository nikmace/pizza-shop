import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { NotificationProvider } from 'web3uikit';

import { store } from 'redux/store';

import App from './App';

import './scss/app.scss';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <NotificationProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </NotificationProvider>
);
