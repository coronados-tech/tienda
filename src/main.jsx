import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
