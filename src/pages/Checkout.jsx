import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import FormularioCompra from '../components/FormularioCompra.jsx';
import ResumenCompra from '../components/ResumenCompra.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useCoupon } from '../hooks/useCoupon.js';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalItems, totalAmount } = useCart();
  const appliedCouponFromCart = location.state?.appliedCoupon ?? '';
  const { pricing } = useCoupon(totalAmount, appliedCouponFromCart);

  const isCartEmpty = cart.length === 0;

  if (isCartEmpty) {
    return <Navigate to="/carrito" replace />;
  }

  const handleConfirmPurchase = (formData) => {
    navigate('/carrito/confirmacion', {
      replace: true,
      state: {
        orderNumber: `CTH-${Date.now().toString().slice(-8)}`,
        formData,
        items: cart.map((item) => ({ ...item })),
        pricing,
        totalItems,
      },
    });
  };

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <h1 className="h2 page-title mb-0">Finalizar compra</h1>
        <Button as={Link} to="/carrito" variant="outline-accent" size="sm">
          ← Volver al carrito
        </Button>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="bg-card rounded-4 p-3 p-md-4">
            <h2 className="h5 mb-4">Datos de envío</h2>
            <FormularioCompra onConfirmar={handleConfirmPurchase} />
          </div>
        </div>

        <div className="col-lg-5">
          <ResumenCompra cart={cart} totalItems={totalItems} pricing={pricing} compact />
        </div>
      </div>
    </Container>
  );
}

export default Checkout;
