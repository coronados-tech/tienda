import { useState } from "react";
import { Container, Row, Col, Card, Collapse, Badge } from "react-bootstrap";
import rafaelFoto from "../assets/profile.images/rafael.png";
import micaelaFoto from "../assets/profile.images/micaela.png";

const integrantes = [
  {
    id: 1,
    nombre: "Valentina",
    apellido: "Coronado",
    dni: "40.123.456",
    foto: "https://i.pravatar.cc/200?img=47",

    redes: [
      { nombre: "LinkedIn", url: "https://linkedin.com" },
      { nombre: "Instagram", url: "https://instagram.com" },
      { nombre: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 2,
    nombre: "Matías",
    apellido: "Ruiz",
    dni: "41.234.567",
    foto: "https://i.pravatar.cc/200?img=12",

    redes: [
      { nombre: "LinkedIn", url: "https://linkedin.com" },
      { nombre: "Twitter/X", url: "https://twitter.com" },
      { nombre: "GitHub", url: "https://github.com" },
    ],
  },
  {
    id: 3,
    nombre: "Micaela Natalia",
    apellido: "Signorello",
    dni: "38.624.940",
    foto: micaelaFoto,

    redes: [
      { 
        nombre: "LinkedIn", 
        url: "https://www.linkedin.com/in/micaela-signorello-a2128a29b/",
      },
      { nombre: "GitHub", url: "https://github.com/MicaelaSignorello" },
    ],
  },
  {
    id: 4,
    nombre: "Rafael Alberto",
    apellido: "Barberi Salcedo",
    dni: "95.151.120",
    foto: rafaelFoto,

    redes: [
      {
        nombre: "LinkedIn",
        url: "https://www.linkedin.com/in/rafael-barberi-informatica/",
      },
      { nombre: "GitHub", url: "https://github.com/RafaelBarberiS" },
      { nombre: "Instagram", url: "https://www.instagram.com/raffa_beri/" },
    ],
  },
];

function CardIntegrante({ integrante }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <Card
      className="h-100 border-secondary text-center"
      style={{
        background: "var(--bs-dark, #1a1a2e)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: abierta
          ? "0 8px 32px rgba(0,0,0,0.4)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        transform: abierta ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <Card.Body className="d-flex flex-column align-items-center p-4">
        {/* Foto */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid var(--bs-primary, #0d6efd)",
            marginBottom: "0.75rem",
            flexShrink: 0,
          }}
        >
          <img
            src={integrante.foto}
            alt={`${integrante.nombre} ${integrante.apellido}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Nombre */}
        <Card.Title
          className="mb-0"
          style={{ fontSize: "1rem", fontWeight: 700 }}
        >
          {integrante.nombre} {integrante.apellido}
        </Card.Title>

        {/* Botón ver más / ver menos */}
        <button
          className={`btn btn-sm w-100 ${abierta ? "btn-outline-secondary" : "btn-outline-primary"}`}
          onClick={() => setAbierta(!abierta)}
          aria-expanded={abierta}
          style={{ borderRadius: "20px", transition: "all 0.2s ease" }}
        >
          {abierta ? "▲ Ver menos" : "▼ Ver más"}
        </button>

        {/* Contenido expandible */}
        <Collapse in={abierta}>
          <div className="w-100 mt-3 text-start">
            <hr className="border-secondary my-2" />

            <div className="mb-3">
              <p
                className="text-secondary small mb-1"
                style={{ fontWeight: 600, letterSpacing: "0.05em" }}
              >
                🪪 DNI
              </p>
              <p className="mb-0">{integrante.dni}</p>
            </div>

            <div>
              <p
                className="text-secondary small mb-2"
                style={{ fontWeight: 600, letterSpacing: "0.05em" }}
              >
                🔗 Redes sociales
              </p>
              <div className="d-flex flex-wrap gap-2">
                {integrante.redes.map((red) => (
                  <a
                    key={red.nombre}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-secondary"
                    style={{ borderRadius: "20px", fontSize: "0.78rem" }}
                  >
                    {red.nombre}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

function Nosotros() {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="h2 page-title mb-3">Sobre Coronados Tech-Hardware</h1>
          <p className="lead text-secondary mb-4">
            Nacimos de la pasión por el hardware de computadoras. Somos un
            emprendimiento especializado en componentes de PC para quienes
            quieren armar, upgradear o mantener su máquina con piezas de
            calidad.
          </p>

          <Row xs={1} md={2} className="g-4 mb-5">
            <Col>
              <Card className="bg-card border-secondary h-100">
                <Card.Body>
                  <h2 className="h6 text-accent">Nuestra misión</h2>
                  <Card.Text className="text-secondary small">
                    Acercar componentes de última generación con asesoramiento
                    personalizado, para que cada cliente arme la PC ideal según
                    su presupuesto y necesidades.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="bg-card border-secondary h-100">
                <Card.Body>
                  <h2 className="h6 text-accent">Nuestra visión</h2>
                  <Card.Text className="text-secondary small">
                    Ser la tienda de referencia en hardware gamer y profesional
                    en Argentina, reconocida por la calidad de nuestro catálogo
                    y la confianza de nuestra comunidad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="bg-card rounded-4 p-4 mb-5">
            <h2 className="h5 mb-3">¿Por qué elegirnos?</h2>
            <ul className="text-secondary">
              <li className="mb-2">
                Catálogo curado con marcas líderes del mercado.
              </li>
              <li className="mb-2">
                Compatibilidad verificada entre componentes.
              </li>
              <li className="mb-2">Stock actualizado en tiempo real.</li>
              <li className="mb-2">Atención especializada en armado de PCs.</li>
            </ul>
          </div>

          {/* Sección del equipo */}
          <h2 className="h4 mb-4">Nuestro equipo</h2>
          <Row xs={1} sm={2} className="g-4">
            {integrantes.map((integrante) => (
              <Col key={integrante.id}>
                <CardIntegrante integrante={integrante} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Nosotros;
