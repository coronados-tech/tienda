const productImages = import.meta.glob('../assets/fotosProductos/*.png', {
  eager: true,
  import: 'default',
});

const PRODUCT_IMAGE_FILES = {
  1: 'AMD Ryzen 7 7800X3D.png',
  2: 'Intel Core i7-14700K.png',
  3: 'NVIDIA GeForce RTX 4070 Super.png',
  4: 'AMD Radeon RX 7800 XT.png',
  5: 'Kingston Fury Beast 32GB DDR5.png',
  6: 'Corsair Vengeance LPX 16GB DDR4.png',
  7: 'Samsung 990 Pro 1TB NVMe.png',
  8: 'WD Black SN850X 2TB.png',
  9: 'Logitech G Pro X Superlight 2.png',
  10: 'Razer BlackWidow V4.png',
  11: 'LG UltraGear 27 1440p 165Hz.png',
  12: 'ASUS ROG Swift 32 4K 144Hz.png',
  13: 'Corsair RM850x 850W 80+ Gold.png',
  14: 'NZXT H7 Flow RGB.png',
  15: 'Cooler Master Hyper 212 RGB.png',
};

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#1a2235" width="600" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8b95a8" font-family="sans-serif" font-size="18">Imagen no disponible</text></svg>'
  );

function resolveImagePath(fileName) {
  const path = `../assets/fotosProductos/${fileName}`;
  return productImages[path] ?? null;
}

/**
 * Resolves all gallery images for a product.
 * Order: main image, then {nombre}-2.png or {nombre} 2.png (and 3, 4) if they exist.
 */
export function resolveProductImages(id) {
  const fileName = PRODUCT_IMAGE_FILES[id];
  if (!fileName) return [PLACEHOLDER];

  const baseName = fileName.replace(/\.png$/i, '');
  const fileCandidates = [fileName];

  for (let index = 2; index <= 4; index += 1) {
    fileCandidates.push(`${baseName}-${index}.png`, `${baseName} ${index}.png`);
  }

  const seen = new Set();
  const images = [];

  fileCandidates.forEach((file) => {
    const src = resolveImagePath(file);
    if (src && !seen.has(src)) {
      seen.add(src);
      images.push(src);
    }
  });

  return images.length ? images : [PLACEHOLDER];
}

/**
 * Resolves the main product image (first gallery image).
 */
export function resolveProductImage(id) {
  return resolveProductImages(id)[0];
}
