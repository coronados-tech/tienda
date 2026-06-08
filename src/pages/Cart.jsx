import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Modal } from 'react-bootstrap';
import CartItem from '../components/CartItem.jsx';
import FormularioCompra from '../components/FormularioCompra.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';

function Carrito() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalAmount,
  } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);

  const isCartEmpty = cart.length === 0;

  const handleConfirmPurchase = (formData) => {
    setPurchaseData(formData);
    setShowModal(true);
    clearCart();
  };

  const orderNumber = `CTH-${Date.now().toString().slice(-8)}`;

  return (
    <Container className="py-5">
      <h1 className="h2 page-title mb-4">Carrito de compras</h1>

      {isCartEmpty ? (
        <div className="empty-state bg-card rounded-4">
          <div className="empty-state-icon">🛒</div>
          <h2 className="h5">Tu carrito está vacío</h2>
          <p className="mb-4">Explorá nuestro catálogo y agregá componentes para tu PC.</p>
          <Button as={Link} to="/productos" variant="accent">
            Ver productos
          </Button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="bg-card rounded-4 p-3 p-md-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdate={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cart-summary sticky-lg-top" style={{ top: 90 }}>
              <h2 className="h6 mb-3">Resumen del pedido</h2>
              <div className="d-flex justify-content-between mb-2 text-secondary">
                <span>Productos</span>
                <span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-semibold">Total</span>
                <span className="price-tag">{formatPrice(totalAmount)}</span>
              </div>
              <hr className="border-secondary" />
              <h3 className="h6 mb-3">Finalizar compra</h3>
              <FormularioCompra carritoVacio={false} onConfirmar={handleConfirmPurchase} />
            </div>
          </div>
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="modal-compra-confirmada"
      >
        <Modal.Header closeButton className="modal-compra-header border-0">
          <Modal.Title>Pedido confirmado</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-compra-body">
          <div className="modal-compra-icon mb-3">✓</div>
          <h3 className="h5 mb-2">¡Gracias por tu compra!</h3>
          <p className="mb-2">
            {purchaseData?.nombre
              ? `${purchaseData.nombre}, tu pedido fue registrado correctamente.`
              : 'Tu pedido fue registrado correctamente.'}
          </p>
          <p className="text-secondary small mb-2">
            Número de pedido: <strong className="text-accent">{orderNumber}</strong>
          </p>
          <p className="text-secondary small mb-0">
            Te enviaremos un email a <strong>{purchaseData?.email || 'tu correo'}</strong> con el
            detalle del envío y el seguimiento del pedido.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-compra-footer border-0">
          <Button variant="accent" onClick={() => setShowModal(false)}>
            Entendido
          </Button>
          <Button
            as={Link}
            to="/productos"
            variant="outline-accent"
            onClick={() => setShowModal(false)}
          >
            Seguir comprando
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Carrito;
