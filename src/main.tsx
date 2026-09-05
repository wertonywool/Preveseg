import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Limpiar cachés antiguas con productos de prueba
try {
  sessionStorage.removeItem('home_products_cache');
  sessionStorage.removeItem('products_cache');
} catch (e) {}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
