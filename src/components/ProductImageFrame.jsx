import { Badge } from 'react-bootstrap';
import ProductTagBadge from './ProductTagBadge.jsx';

function ProductImageFrame({ product, children }) {
  return (
    <div className="position-relative">
      {children}
      {product.tag && (
        <ProductTagBadge tag={product.tag} className="product-image-badge" />
      )}
      {product.stock <= 0 && (
        <Badge bg="secondary" className="badge-tag product-image-badge">
          Sin stock
        </Badge>
      )}
    </div>
  );
}

export default ProductImageFrame;
