import { createContext, useContext, useEffect, useState } from 'react';
import { getProductById } from '../data/products.js';
import { resolveProductImage } from '../utils/productImages.js';

const CartContext = createContext(null);

const STORAGE_KEY = 'coronados-carrito';

const loadCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const normalizeCartItem = (item) => {
  const migrated = {
    ...item,
    name: item.name ?? item.nombre,
    category: item.category ?? item.categoria,
    price: item.price ?? item.precio,
    description: item.description ?? item.descripcion,
    quantity: item.quantity ?? item.cantidad,
    tag: item.tag ?? item.etiqueta,
    features: item.features ?? item.caracteristicas,
  };

  const currentProduct = getProductById(migrated.id);
  const stock = currentProduct?.stock ?? migrated.stock ?? 0;

  return {
    ...migrated,
    stock,
    image: resolveProductImage(migrated.id),
  };
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart().map(normalizeCartItem));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      return { ok: false, reason: 'out_of_stock' };
    }

    let result = { ok: true };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          result = { ok: false, reason: 'max_stock' };
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                stock: product.stock,
                image: resolveProductImage(product.id),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          image: resolveProductImage(product.id),
        },
      ];
    });

    return result;
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }

      return prev.map((item) => {
        if (item.id !== id) return item;
        const currentProduct = getProductById(id);
        const availableStock = currentProduct?.stock ?? item.stock;
        const finalQuantity = Math.min(newQuantity, availableStock);
        return { ...item, quantity: finalQuantity, stock: availableStock };
      });
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
