const localImages = import.meta.glob('../assets/products/product_*.jpg', {
  eager: true,
  import: 'default',
});

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#1a2235" width="600" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8b95a8" font-family="sans-serif" font-size="18">Imagen no disponible</text></svg>'
  );

/**
 * Resolves the local image for a product: src/assets/products/product_{id}.jpg
 * Falls back to a placeholder when the file is not available.
 */
export function resolveProductImage(id) {
  const path = `../assets/products/product_${id}.jpg`;
  return localImages[path] ?? PLACEHOLDER;
}
