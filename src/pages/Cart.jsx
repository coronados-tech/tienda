import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import CartItem from '../components/CartItem.jsx';
import ResumenCompra from '../components/ResumenCompra.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../data/products.js';
import { BULK_DISCOUNT_THRESHOLD } from '../patterns/strategy/discountStrategies.js';
import { useCoupon } from '../hooks/useCoupon.js';

function Carrito() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalAmount,
  } = useCart();

  const {
    couponInput,
    setCouponInput,
    appliedCoupon,
    pricing,
    couponFeedback,
    handleApplyCoupon,
  } = useCoupon(totalAmount);

  const isCartEmpty = cart.length === 0;

  const bulkDiscountActive = pricing.appliedDiscounts.some((discount) => discount.id === 'bulk');
  const bulkDiscountAmount =
    pricing.appliedDiscounts.find((discount) => discount.id === 'bulk')?.amount ?? 0;
  const amountToBulkDiscount = Math.max(0, BULK_DISCOUNT_THRESHOLD + 1 - totalAmount);
  const bulkProgress = Math.min(100, (totalAmount / (BULK_DISCOUNT_THRESHOLD + 1)) * 100);

  return (
    <Container className="py-5">
      <h1 className="h2 page-title mb-4">Carrito de compras</h1>

      <div className={`cart-discount-banner ${bulkDiscountActive ? 'is-active' : ''}`}>
        <div className="cart-discount-banner-badge">15% OFF</div>
        <div className="cart-discount-banner-body">
          <p className="cart-discount-banner-title">Descuento automático en compras grandes</p>
          <p className="cart-discount-banner-text">
            Compras superiores a {formatPrice(BULK_DISCOUNT_THRESHOLD)} obtienen un 15% de descuento
            automático. Se acumula con cupones válidos.
          </p>
          {!isCartEmpty && !bulkDiscountActive && (
            <>
              <div
                className="cart-discount-banner-progress"
                role="progressbar"
                aria-valuenow={Math.round(bulkProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso hacia el descuento del 15%"
              >
                <div
                  className="cart-discount-banner-progress-bar"
                  style={{ width: `${bulkProgress}%` }}
                />
              </div>
              <p className="cart-discount-banner-text mt-2 mb-0">
                Te faltan <strong className="text-accent">{formatPrice(amountToBulkDiscount)}</strong>{' '}
                para activarlo.
              </p>
            </>
          )}
        </div>
        {!isCartEmpty && bulkDiscountActive && (
          <div className="cart-discount-banner-meta">
            <span className="text-success">¡Activado!</span>
            <strong>− {formatPrice(bulkDiscountAmount)}</strong>
          </div>
        )}
      </div>

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
            <div className="sticky-lg-top" style={{ top: 90 }}>
              <ResumenCompra
                totalItems={totalItems}
                pricing={pricing}
                showCoupon
                couponInput={couponInput}
                onCouponInputChange={(e) => setCouponInput(e.target.value)}
                onApplyCoupon={handleApplyCoupon}
                couponFeedback={couponFeedback}
              >
                <Button
                  as={Link}
                  to="/carrito/finalizar"
                  state={{ appliedCoupon }}
                  variant="accent"
                  size="lg"
                  className="w-100"
                >
                  Comprar
                </Button>
              </ResumenCompra>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Carrito;
