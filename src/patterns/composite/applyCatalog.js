import { CompositeFilter } from './CompositeFilter.js';
import { filterStrategies, getSortStrategy } from '../strategy/productFilters.js';

export function applyCatalog(products, criteria) {
  const { search, category, inStockOnly, maxPrice, tag, sort } = criteria;

  const compositeFilter = new CompositeFilter()
    .add(filterStrategies.text(search))
    .add(filterStrategies.category(category))
    .add(filterStrategies.stock(inStockOnly))
    .add(filterStrategies.maxPrice(maxPrice))
    .add(filterStrategies.tag(tag ?? 'Todas'));

  const filtered = compositeFilter.filter(products);
  const sortFn = getSortStrategy(sort);

  return sortFn(filtered);
}
