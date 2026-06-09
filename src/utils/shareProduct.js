import { formatPrice } from '../data/products.js';

function getProductPageUrl(product) {
  const path = `/producto/${product.id}`;
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
}

export function buildProductShareText(product) {
  const code = `CTH-${String(product.id).padStart(4, '0')}`;
  const stockLine =
    product.stock > 0
      ? `Stock: ${product.stock} unidades`
      : 'Sin stock disponible';

  return [
    `${product.name} — Coronados Tech-Hardware`,
    '',
    `Precio: ${formatPrice(product.price)}`,
    `Categoría: ${product.category}`,
    `Código: ${code}`,
    stockLine,
    '',
    product.description,
    '',
    `Ver producto: ${getProductPageUrl(product)}`,
  ].join('\n');
}

export function getWhatsAppShareUrl(product) {
  const text = encodeURIComponent(buildProductShareText(product));
  return `https://wa.me/?text=${text}`;
}

export function getTwitterShareUrl(product) {
  const text = encodeURIComponent(
    `${product.name} — ${formatPrice(product.price)} | Coronados Tech-Hardware`,
  );
  const url = encodeURIComponent(getProductPageUrl(product));
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}
