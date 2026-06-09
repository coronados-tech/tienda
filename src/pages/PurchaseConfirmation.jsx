import { useEffect, useRef } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

const METODOS_ENTREGA = {
  'envio-domicilio': 'Envío a domicilio',
  'retiro-sucursal': 'Retiro en sucursal',
  'correo-argentino': 'Correo Argentino',
};

function isValidPurchaseState(purchase) {
  return (
    purchase?.orderNumber &&
    purchase?.formData &&
    typeof purchase?.pricing?.subtotal === 'number' &&
    typeof purchase?.pricing?.total === 'number' &&
    Array.isArray(purchase?.pricing?.appliedDiscounts)
  );
}

function PurchaseConfirmation() {
  const location = useLocation();
  const { clearCart } = useCart();
  const purchase = location.state;
  const hasClearedCart = useRef(false);
  const isValidPurchase = isValidPurchaseState(purchase);

  useEffect(() => {
    if (!isValidPurchase || hasClearedCart.current) return;
    hasClearedCart.current = true;
    clearCart();
  }, [clearCart, isValidPurchase]);

  if (!isValidPurchase) {
    return <Navigate to="/productos" replace />;
  }

  const { orderNumber, formData, items = [], pricing, totalItems } = purchase;
  const metodoEntrega = METODOS_ENTREGA[formData.metodoEntrega] ?? formData.metodoEntrega;

  return (
    <Container className="py-5">
      <div className="purchase-confirmation bg-card rounded-4 p-4 p-md-5">
        <div className="text-center mb-5">
          <div className="purchase-confirmation-icon mx-auto mb-3">✓</div>
          <h1 className="h2 page-title mb-2">¡Gracias por tu compra!</h1>
          <p className="text-secondary mb-0">
            {formData.nombre}, tu pedido fue registrado correctamente. Te enviaremos un email a{' '}
            <strong>{formData.email}</strong> con el seguimiento del envío.
          </p>
        </div>

        <div className="purchase-order-code text-center mb-5">
          <p className="small text-secondary text-uppercase mb-1">Código de compra</p>
          <p className="purchase-order-code-value mb-0">{orderNumber}</p>
        </div>

        <Row className="g-4">
          <Col lg={7}>
            <section className="purchase-section">
              <h2 className="h5 mb-3">Detalle de la compra</h2>
              <ul className="checkout-summary-items list-unstyled mb-3">
                {items.map((item) => (
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

              <div className="d-flex justify-content-between pt-2 border-top border-secondary">
                <span className="fw-semibold">Total pagado</span>
                <span className="price-tag">{formatPrice(pricing.total)}</span>
              </div>
            </section>
          </Col>

          <Col lg={5}>
            <section className="purchase-section h-100">
              <h2 className="h5 mb-3">Datos del cliente</h2>
              <dl className="purchase-details-list mb-0">
                <div className="purchase-details-row">
                  <dt>Nombre</dt>
                  <dd>
                    {formData.nombre} {formData.apellido}
                  </dd>
                </div>
                <div className="purchase-details-row">
                  <dt>Email</dt>
                  <dd>{formData.email}</dd>
                </div>
                <div className="purchase-details-row">
                  <dt>Teléfono</dt>
                  <dd>{formData.telefono}</dd>
                </div>
                <div className="purchase-details-row">
                  <dt>Dirección</dt>
                  <dd>{formData.direccion}</dd>
                </div>
                <div className="purchase-details-row">
                  <dt>Entrega</dt>
                  <dd>{metodoEntrega}</dd>
                </div>
                {formData.mensaje && (
                  <div className="purchase-details-row">
                    <dt>Aclaración</dt>
                    <dd>{formData.mensaje}</dd>
                  </div>
                )}
              </dl>
            </section>
          </Col>
        </Row>

        <div className="d-flex flex-wrap justify-content-center gap-2 mt-5">
          <Button as={Link} to="/productos" variant="accent" size="lg">
            Seguir comprando
          </Button>
          <Button as={Link} to="/" variant="outline-accent" size="lg">
            Volver al inicio
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default PurchaseConfirmation;
