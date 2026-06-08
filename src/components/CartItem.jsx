import { Link } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { formatPrice } from '../data/products.js';
import { resolveProductImage } from '../utils/productImages.js';

function CartItem({ item, onUpdate, onRemove }) {
  const subtotal = item.price * item.quantity;
  const outOfStock = item.stock <= 0;
  const maxStockReached = item.quantity >= item.stock;

  return (
    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 py-3 border-bottom border-secondary">
      <Link to={`/producto/${item.id}`}>
        <img
          src={resolveProductImage(item.id)}
          alt={item.name}
          className="rounded cart-item-image"
        />
      </Link>
      <div className="flex-grow-1">
        <h6 className="mb-1">
          <Link to={`/producto/${item.id}`} className="text-accent text-decoration-none">
            {item.name}
          </Link>
        </h6>
        <p className="small text-secondary mb-0">{formatPrice(item.price)} c/u</p>
        {maxStockReached && !outOfStock && (
          <p className="small text-warning mb-0 mt-1">No hay más stock disponible.</p>
        )}
        {outOfStock && (
          <p className="small text-danger mb-0 mt-1">No hay stock disponible.</p>
        )}
      </div>
      <InputGroup size="sm" style={{ maxWidth: 130 }}>
        <Button
          variant="outline-secondary"
          onClick={() => onUpdate(item.id, item.quantity - 1)}
        >
          −
        </Button>
        <Form.Control
          className="text-center"
          value={item.quantity}
          readOnly
          aria-label="Cantidad"
        />
        <Button
          variant="outline-secondary"
          onClick={() => onUpdate(item.id, item.quantity + 1)}
          disabled={maxStockReached || outOfStock}
        >
          +
        </Button>
      </InputGroup>
      <div className="text-md-end" style={{ minWidth: 120 }}>
        <p className="price-tag mb-0">{formatPrice(subtotal)}</p>
      </div>
      <Button variant="outline-danger" size="sm" onClick={() => onRemove(item.id)}>
        Eliminar
      </Button>
    </div>
  );
}

export default CartItem;
