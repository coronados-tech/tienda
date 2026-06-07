import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-coronados py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <span className="brand-mono fw-bold text-white">Coronados Tech-Hardware</span>
            <p className="mb-0 small mt-1">
              Componentes de PC para gamers, creadores y entusiastas del hardware.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/productos" className="text-accent me-3 small">
              Catálogo
            </Link>
            <Link to="/contacto" className="text-accent me-3 small">
              Contacto
            </Link>
            <p className="mb-0 small mt-2">© 2026 Coronados Tech-Hardware — Trabajo Práctico CIU</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
