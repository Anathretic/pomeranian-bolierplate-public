import React from 'react';
import ReactDOM from 'react-dom/client';
import { worker } from './Mocks/setupWorker';

import './index.css';
import { App } from './App';

worker.start({ onUnhandledRequest: 'bypass' });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
