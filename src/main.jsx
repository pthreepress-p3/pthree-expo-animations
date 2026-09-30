
window.addEventListener("error", (e) => {
  fetch('http://localhost:3000/log', { method: 'POST', body: e.message + " | " + e.filename + ":" + e.lineno });
});
window.addEventListener("unhandledrejection", (e) => {
  fetch('http://localhost:3000/log', { method: 'POST', body: "Promise Rejection: " + e.reason });
});

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
