import { Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { formatPrice } from '../data/products.js';

function ResumenCompra({
  cart = [],
  totalItems,
  pricing,
  compact = false,
  showCoupon = false,
  couponInput,
  onCouponInputChange,
  onApplyCoupon,
  couponFeedback,
  children,
}) {
  return (
    <div className={`cart-summary ${compact ? 'checkout-summary' : ''}`}>
      <h2 className="h6 mb-3">{compact ? 'Tu compra' : 'Resumen del pedido'}</h2>

      {compact && cart.length > 0 && (
        <ul className="checkout-summary-items list-unstyled mb-3">
          {cart.map((item) => (
            <li key={item.id} className="checkout-summary-item">
              <span className="checkout-summary-item-name">
                {item.name} <span className="text-secondary">x{item.quantity}</span>
              </span>
              <span className="checkout-summary-item-price">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="d-flex justify-content-between mb-2 text-secondary">
        <span>Productos</span>
        <span>{totalItems}</span>
      </div>
      <div className="d-flex justify-content-between mb-2 text-secondary">
        <span>Subtotal</span>
        <span>{formatPrice(pricing.subtotal)}</span>
      </div>

      {pricing.appliedDiscounts.map((discount) => (
        <div key={discount.id} className="d-flex justify-content-between mb-2 text-success">
          <span>
            {discount.label} ({Math.round(discount.percentage * 100)}%)
          </span>
          <span>− {formatPrice(discount.amount)}</span>
        </div>
      ))}

      {pricing.appliedDiscounts.length > 1 && (
        <div className="d-flex justify-content-between mb-2 text-success fw-semibold">
          <span>Descuento total</span>
          <span>− {formatPrice(pricing.discountAmount)}</span>
        </div>
      )}

      <div className={`d-flex justify-content-between ${showCoupon || children ? 'mb-3' : 'mb-0'}`}>
        <span className="fw-semibold">Total</span>
        <span className="price-tag">{formatPrice(pricing.total)}</span>
      </div>

      {showCoupon && (
        <Form.Group className="mb-3">
          <Form.Label className="small mb-1">Cupón de descuento</Form.Label>
          <InputGroup size="sm">
            <Form.Control
              value={couponInput}
              onChange={onCouponInputChange}
              placeholder="Ej: NEW"
              aria-label="Código de cupón"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onApplyCoupon();
                }
              }}
            />
            <Button variant="outline-accent" onClick={onApplyCoupon}>
              Aplicar
            </Button>
          </InputGroup>
          {couponFeedback && (
            <Alert variant={couponFeedback.variant} className="border-0 py-2 px-3 mt-2 mb-0 small">
              {couponFeedback.text}
            </Alert>
          )}
        </Form.Group>
      )}

      {children}
    </div>
  );
}

export default ResumenCompra;
