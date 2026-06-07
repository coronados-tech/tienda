import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BannerSlider from '../components/BannerSlider.jsx';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

function Inicio() {
  const featured = products.filter((p) => p.tag).slice(0, 4);

  return (
    <>
      <BannerSlider />

      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <span className="hero-badge d-inline-block mb-3">Hardware de computadoras</span>
              <h1 className="display-5 fw-bold page-title mb-3">
                Coronados <span className="text-accent">Tech-Hardware</span>
              </h1>
              <p className="lead text-secondary mb-4">
                Somos tu tienda especializada en componentes de PC. Desde procesadores y placas de
                video hasta periféricos y monitores, te ayudamos a armar la máquina perfecta para
                gaming, diseño o trabajo.
              </p>
              <Button as={Link} to="/productos" variant="accent" size="lg" className="me-2 mb-2">
                Explorar catálogo
              </Button>
              <Button
                as={Link}
                to="/nosotros"
                variant="outline-accent"
                size="lg"
                className="mb-2"
              >
                Conocenos
              </Button>
            </Col>
            <Col lg={5} className="text-center mt-4 mt-lg-0">
              <div className="bg-card rounded-4 p-4">
                <div className="display-1 mb-2">🖥️</div>
                <h3 className="h5 brand-mono text-accent">Build. Play. Create.</h3>
                <p className="text-secondary small mb-0">
                  +15 componentes en stock · Envíos a todo el país
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="h3 page-title mb-1">Productos destacados</h2>
              <p className="text-secondary mb-0">Lo más buscado de nuestra tienda</p>
            </div>
            <Button as={Link} to="/productos" variant="outline-accent" size="sm">
              Ver todos →
            </Button>
          </div>
          <Row xs={1} sm={2} lg={4} className="g-4">
            {featured.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 border-top border-secondary">
        <Container>
          <Row xs={1} md={3} className="g-4">
            {[
              { icono: '🚚', titulo: 'Envío rápido', texto: 'Despacho en 24-48 hs en CABA y GBA.' },
              {
                icono: '🔧',
                titulo: 'Asesoramiento',
                texto: 'Te ayudamos a elegir componentes compatibles.',
              },
              {
                icono: '✅',
                titulo: 'Garantía oficial',
                texto: 'Todos los productos con garantía del fabricante.',
              },
            ].map((item) => (
              <Col key={item.titulo}>
                <Card className="bg-card h-100 border-0 text-center p-3">
                  <div className="fs-2 mb-2">{item.icono}</div>
                  <Card.Title className="h6">{item.titulo}</Card.Title>
                  <Card.Text className="text-secondary small">{item.texto}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Inicio;
