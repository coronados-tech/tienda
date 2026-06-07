import { Container, Row, Col, Card } from 'react-bootstrap';
import FormularioContacto from '../components/FormularioContacto.jsx';

function Contacto() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={5}>
          <h1 className="h2 page-title mb-3">Contacto</h1>
          <p className="text-secondary mb-4">
            ¿Tenés dudas sobre un producto, stock o armado de PC? Escribinos y te respondemos a la
            brevedad.
          </p>

          <Card className="bg-card border-secondary mb-3">
            <Card.Body>
              <h2 className="h6">📍 Sucursal</h2>
              <p className="text-secondary small mb-0">
                Av. Corrientes 1234, CABA
                <br />
                Lun a Vie 10:00 - 19:00
              </p>
            </Card.Body>
          </Card>

          <Card className="bg-card border-secondary mb-3">
            <Card.Body>
              <h2 className="h6">📧 Email</h2>
              <p className="text-secondary small mb-0">ventas@coronadostech.com</p>
            </Card.Body>
          </Card>

          <Card className="bg-card border-secondary">
            <Card.Body>
              <h2 className="h6">📞 Teléfono</h2>
              <p className="text-secondary small mb-0">0800-CORONADOS (267-6237)</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <div className="bg-card rounded-4 p-4">
            <h2 className="h5 mb-4">Formulario de contacto</h2>
            <FormularioContacto />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
