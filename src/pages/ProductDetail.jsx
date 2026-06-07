import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Alert, Breadcrumb } from 'react-bootstrap';
import { useState } from 'react';
import { getProductById, formatPrice } from '../data/products.js';
import { categoryToSlug } from '../utils/categories.js';
import ProductTagBadge from '../components/ProductTagBadge.jsx';
import ProductImageZoom from '../components/ProductImageZoom.jsx';

function DetalleProducto() {
  const { id } = useParams();
  const product = getProductById(id);
  const [message, setMessage] = useState(null);

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
    setMessage({ variant: 'info', text: 'Carrito disponible próximamente.' });
    setTimeout(() => setMessage(null), 3000);
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
          <ProductImageZoom src={product.image} alt={product.name} />
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
            <Button variant="accent" size="lg" disabled={outOfStock} onClick={handleAdd}>
              {outOfStock ? 'Sin stock disponible' : 'Agregar al carrito'}
            </Button>
            <Button as={Link} to="/carrito" variant="outline-accent" size="lg">
              Ir al carrito
            </Button>
          </div>

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