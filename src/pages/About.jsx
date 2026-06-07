import { Container, Row, Col, Card } from 'react-bootstrap';

function Nosotros() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="h2 page-title mb-3">Sobre Coronados Tech-Hardware</h1>
          <p className="lead text-secondary mb-4">
            Nacimos de la pasión por el hardware de computadoras. Somos un emprendimiento
            especializado en componentes de PC para quienes quieren armar, upgradear o mantener su
            máquina con piezas de calidad.
          </p>

          <Row xs={1} md={2} className="g-4 mb-5">
            <Col>
              <Card className="bg-card border-secondary h-100">
                <Card.Body>
                  <h2 className="h6 text-accent">Nuestra misión</h2>
                  <Card.Text className="text-secondary small">
                    Acercar componentes de última generación con asesoramiento personalizado, para
                    que cada cliente arme la PC ideal según su presupuesto y necesidades.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="bg-card border-secondary h-100">
                <Card.Body>
                  <h2 className="h6 text-accent">Nuestra visión</h2>
                  <Card.Text className="text-secondary small">
                    Ser la tienda de referencia en hardware gamer y profesional en Argentina,
                    reconocida por la calidad de nuestro catálogo y la confianza de nuestra
                    comunidad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="bg-card rounded-4 p-4">
            <h2 className="h5 mb-3">¿Por qué elegirnos?</h2>
            <ul className="text-secondary">
              <li className="mb-2">Catálogo curado con marcas líderes del mercado.</li>
              <li className="mb-2">Compatibilidad verificada entre componentes.</li>
              <li className="mb-2">Stock actualizado en tiempo real.</li>
              <li className="mb-2">Atención especializada en armado de PCs.</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;
