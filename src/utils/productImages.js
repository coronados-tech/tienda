const productImages = import.meta.glob('../assets/fotosProductos/*.png', {
  eager: true,
  import: 'default',
});

export const IMAGE_PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="#1a2235" width="600" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8b95a8" font-family="sans-serif" font-size="18">Imagen no disponible</text></svg>',
  );

function resolveImagePath(fileName) {
  const path = `../assets/fotosProductos/${fileName}`;
  return productImages[path] ?? null;
}

export function resolveImageUrls(fileNames = []) {
  if (!fileNames.length) return [IMAGE_PLACEHOLDER];

  const urls = fileNames
    .map((fileName) => resolveImagePath(fileName))
    .filter(Boolean);

  return urls.length ? urls : [IMAGE_PLACEHOLDER];
}
