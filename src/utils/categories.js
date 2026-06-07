import { categories } from '../data/products.js';

export const categoryToSlug = (category) =>
  category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');

export const slugToCategory = (slug) => {
  if (!slug) return null;
  const normalized = slug.toLowerCase();
  return categories.find((cat) => cat !== 'Todas' && categoryToSlug(cat) === normalized) ?? null;
};

export const availableTags = ['Más vendido', 'Nuevo', 'Oferta'];
