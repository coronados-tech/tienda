import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Card, Button, Badge } from 'react-bootstrap';
import { formatPrice } from '../data/products.js';
import { DecoratedProductImage } from '../patterns/decorator/ProductDecorators.jsx';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const [feedback, setFeedback] = useState(null);
  const outOfStock = product.stock <= 0;

  useEffect(() => {
    if (!feedback) return undefined;
    const timer = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    setFeedback({ variant: 'success', text: '¡Producto agregado al carrito! 🛒' });
  };

  return (
    <Card className="product-card h-100">
      <DecoratedProductImage product={product}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </DecoratedProductImage>
      <Card.Body>
        <Badge bg="dark" className="mb-2 text-secondary border border-secondary">
          {product.category}
        </Badge>
        <Card.Title className="h6">{product.name}</Card.Title>
        <Card.Text className="text-secondary small">{product.description}</Card.Text>
        <p className="price-tag mb-2">{formatPrice(product.price)}</p>
        <p className="small text-secondary mb-3">
          {outOfStock ? (
            <span className="text-danger">No hay stock disponible</span>
          ) : (
            <>Stock: {product.stock} unidades</>
          )}
        </p>

        {feedback && (
          <Alert variant={feedback.variant} className="border-0 py-2 px-3 small mb-3">
            {feedback.text}
          </Alert>
        )}

        <div className="d-flex gap-2 mt-auto">
          <Button
            as={Link}
            to={`/producto/${product.id}`}
            variant="outline-accent"
            size="sm"
            className="flex-grow-1"
          >
            Ver detalle
          </Button>
          <Button
            variant="accent"
            size="sm"
            className="flex-grow-1"
            disabled={outOfStock}
            onClick={handleAdd}
          >
            {outOfStock ? 'Sin stock' : 'Agregar'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;