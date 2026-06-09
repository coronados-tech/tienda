import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { products } from '../data/products.js';

function Favoritos() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const isEmpty = favoriteProducts.length === 0;

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h1 className="h2 page-title mb-0">Mis favoritos</h1>
        {!isEmpty && (
          <Button variant="outline-secondary" size="sm" onClick={clearFavorites}>
            Limpiar favoritos
          </Button>
        )}
      </div>

      {isEmpty ? (
        <div className="empty-state bg-card rounded-4">
          <div className="empty-state-icon">♡</div>
          <h2 className="h5">No tenés productos favoritos</h2>
          <p className="mb-4">
            Marcá los componentes que te interesen con el corazón y los vas a encontrar acá.
          </p>
          <Button as={Link} to="/productos" variant="accent">
            Ver productos
          </Button>
        </div>
      ) : (
        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {favoriteProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favoritos;
