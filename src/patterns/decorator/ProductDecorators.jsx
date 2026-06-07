import { Badge } from 'react-bootstrap';
import ProductTagBadge from '../../components/ProductTagBadge.jsx';

/**
 * Decorator pattern: wraps content and adds visual behavior
 * (badges) without modifying the base ProductCard component.
 */
export function PromoTagDecorator({ product, children }) {
  if (!product.tag) return children;

  return (
    <>
      {children}
      <ProductTagBadge tag={product.tag} className="sin-stock-overlay" />
    </>
  );
}

export function OutOfStockDecorator({ product, children }) {
  if (product.stock > 0) return children;

  return (
    <>
      {children}
      <Badge
        bg="secondary"
        className="badge-etiqueta"
        style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}
      >
        Sin stock
      </Badge>
    </>
  );
}

export function DecoratedProductImage({ product, children }) {
  return (
    <div className="position-relative">
      <OutOfStockDecorator product={product}>
        <PromoTagDecorator product={product}>{children}</PromoTagDecorator>
      </OutOfStockDecorator>
    </div>
  );
}