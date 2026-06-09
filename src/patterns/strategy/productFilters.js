/**
 * Strategy pattern: each filter and sort option is an interchangeable strategy.
 * The catalog selects which strategies to apply based on UI state.
 */

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/gi, (char) => (char === 'Ñ' ? 'N' : 'n'))
    .toLowerCase();
}

function fieldMatchesTerm(field, term) {
  const normalizedField = normalizeText(field);
  const normalizedTerm = normalizeText(term);
  const pattern = new RegExp(`\\b${escapeRegex(normalizedTerm)}`, 'i');
  return pattern.test(normalizedField);
}

export const filterStrategies = {
  text:
    (search) =>
    (product) => {
      if (!search.trim()) return true;

      const terms = search.trim().split(/\s+/);
      const fields = [product.name, product.description];

      return terms.every((term) =>
        fields.some((field) => fieldMatchesTerm(field, term))
      );
    },

  category:
    (category) =>
    (product) =>
      category === 'Todas' || product.category === category,

  stock:
    (inStockOnly) =>
    (product) =>
      !inStockOnly || product.stock > 0,

  maxPrice:
    (maxPrice) =>
    (product) =>
      !maxPrice || product.price <= Number(maxPrice),

  tag:
    (tag) =>
    (product) =>
      tag === 'Todas' || product.tag === tag,
};

const sortStrategies = {
  default: (list) => list,
  ascending: (list) => [...list].sort((a, b) => a.price - b.price),
  descending: (list) => [...list].sort((a, b) => b.price - a.price),
};

export function getSortStrategy(sort) {
  return sortStrategies[sort] ?? sortStrategies.default;
}
