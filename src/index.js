import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';

// import 'bootstrap/dist/css/bootstrap.min.css';
// ASK ANDREW: why is this import breaking my code?
// import './App.scss';

//Registers the service worker for Progressive Web App functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('serviceWorker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      },
        (error) => {
          console.log('Service Worker Registration failed:', error);
        })
  })
}


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
