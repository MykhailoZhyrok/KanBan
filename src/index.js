import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './store/store';
import './index.css';

import reportWebVitals from './reportWebVitals';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <App/>
  </Provider>
);


reportWebVitals();
