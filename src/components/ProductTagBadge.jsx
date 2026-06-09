import { Badge } from 'react-bootstrap';
import { getTagVariant } from '../utils/productTags.js';

function ProductTagBadge({ tag, className = '' }) {
  if (!tag) return null;

  return (
    <Badge bg={getTagVariant(tag)} className={`badge-tag ${className}`.trim()}>
      {tag}
    </Badge>
  );
}

export default ProductTagBadge;