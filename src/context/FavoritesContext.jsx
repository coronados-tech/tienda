import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'coronados-favoritos';

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadFavorites());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const clearFavorites = () => setFavorites([]);

  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    totalFavorites: favorites.length,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
