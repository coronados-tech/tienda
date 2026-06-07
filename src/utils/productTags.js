export function getTagVariant(tag) {
  if (tag === 'Oferta') return 'danger';
  if (tag === 'Nuevo') return 'info';
  if (tag === 'Más vendido') return 'warning';
  return 'secondary';
}
