import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Breadcrumb } from 'react-bootstrap';
import { useState } from 'react';
import { getProductById, formatPrice } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useActionAnimation } from '../hooks/useActionAnimation.js';
import { categoryToSlug } from '../utils/categories.js';
import ProductTagBadge from '../components/ProductTagBadge.jsx';
import ProductImageGallery from '../components/ProductImageGallery.jsx';
import ShareButtons from '../components/ShareButtons.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';

function DetalleProducto() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [message, setMessage] = useState(null);
  const { active: cartJustAdded, trigger: triggerCartAdded } = useActionAnimation(1000);

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="border-0">
          Producto no encontrado.{' '}
          <Link to="/productos" className="text-accent">
            Volver al catálogo
          </Link>
        </Alert>
      </Container>
    );
  }

  const outOfStock = product.stock <= 0;
  const categorySlug = categoryToSlug(product.category);

  const handleAdd = () => {
    const result = addToCart(product);

    if (result.ok) {
      triggerCartAdded();
      return;
    }

    if (result.reason === 'max_stock') {
      setMessage({ variant: 'warning', text: 'No hay más stock disponible de este producto.' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <Container className="py-5">
      <Breadcrumb className="breadcrumb-coronados mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/productos' }}>
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: `/productos/categoria/${categorySlug}` }}
        >
          {product.category}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={6}>
          <ProductImageGallery images={product.images} alt={product.name} />
          <p className="text-secondary small mt-2 mb-0">
            * Las imágenes se exhiben con fines ilustrativos.
          </p>
        </Col>
        <Col md={6}>
          <h1 className="h2 page-title mb-3">{product.name}</h1>
          <p className="text-secondary mb-3">{product.description}</p>
          <p className="price-tag display-6 mb-3">{formatPrice(product.price)}</p>

          <div className="bg-card rounded-4 p-3 mb-4">
            <ul className="spec-list mb-0">
              <li>
                <span className="spec-label">Código</span>
                <span>CTH-{String(product.id).padStart(4, '0')}</span>
              </li>
              <li>
                <span className="spec-label">Categoría</span>
                <span>{product.category}</span>
              </li>
              <li>
                <span className="spec-label">Disponibilidad</span>
                <span>
                  {outOfStock ? (
                    <span className="text-danger fw-semibold">No hay stock disponible</span>
                  ) : (
                    <span className="text-accent">{product.stock} unidades en stock</span>
                  )}
                </span>
              </li>
              {product.tag && (
                <li>
                  <span className="spec-label">Destacado</span>
                  <span>
                    <ProductTagBadge tag={product.tag} />
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className="d-flex gap-2 flex-wrap mb-3">
            <Button
              variant="accent"
              size="lg"
              className={cartJustAdded ? 'cart-btn-just-added' : undefined}
              disabled={outOfStock}
              onClick={handleAdd}
            >
              {cartJustAdded
                ? '✓ Agregado al carrito'
                : outOfStock
                  ? 'Sin stock disponible'
                  : 'Agregar al carrito'}
            </Button>
            <Button as={Link} to="/carrito" variant="outline-accent" size="lg">
              Ir al carrito
            </Button>
            <FavoriteButton productId={product.id} variant="button" size="lg" />
          </div>

          <ShareButtons product={product} />

          {outOfStock && (
            <Alert variant="danger" className="border-0 py-2 mb-3">
              No hay stock disponible para este producto en este momento.
            </Alert>
          )}

          {message && (
            <Alert variant={message.variant} className="border-0 py-2 mb-3">
              {message.text}
            </Alert>
          )}

          <div className="bg-card rounded-4 p-4">
            <h2 className="h6 mb-3">Especificaciones técnicas</h2>
            <ul className="spec-list">
              {product.features.map((spec) => (
                <li key={spec.label}>
                  <span className="spec-label">{spec.label}</span>
                  <span>{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
