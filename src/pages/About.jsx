import { useState } from "react";
import { Container, Row, Col, Collapse } from "react-bootstrap";
import { integrantes } from "../data/integrantes.js";

const BENEFICIOS = [
  {
    titulo: "Catálogo seleccionado",
    texto: "Trabajamos con las mejores marcas del mercado, sin relleno.",
  },
  {
    titulo: "Compatibilidad chequeada",
    texto: "Verificamos que los componentes funcionen bien entre sí antes de recomendarlos.",
  },
  {
    titulo: "Stock al día",
    texto: "Actualizamos el inventario en tiempo real para que sepas qué hay disponible.",
  },
  {
    titulo: "Asesoramiento de armado",
    texto: "Te ayudamos a armar tu PC según tu bolsillo y lo que necesitás.",
  },
];

function CardIntegrante({ integrante }) {
  const [abierta, setAbierta] = useState(false);

  return (
    <article
      className={`about-team-card ${abierta ? "is-open" : ""}`}
      aria-labelledby={`integrante-${integrante.id}`}
    >
      <div className="about-team-card-header">
        <div className="about-team-avatar">
          <img
            src={integrante.foto}
            alt={`${integrante.nombre} ${integrante.apellido}`}
            style={{ objectPosition: integrante.fotoPosicion ?? "center center" }}
          />
        </div>

        <div className="about-team-info">
          <h3 className="about-team-name" id={`integrante-${integrante.id}`}>
            {integrante.nombre} {integrante.apellido}
          </h3>
          <button
            type="button"
            className={`about-team-toggle ${abierta ? "is-open" : ""}`}
            onClick={() => setAbierta(!abierta)}
            aria-expanded={abierta}
          >
            {abierta ? "Ver menos" : "Ver más"}
            <span className="about-team-toggle-icon" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Collapse in={abierta}>
        <div className="about-team-details">
          <div className="about-team-detail">
            <span className="about-team-detail-label">DNI</span>
            <span>{integrante.dni}</span>
          </div>

          <div className="about-team-detail">
            <span className="about-team-detail-label">Redes</span>
            <div className="about-team-socials">
              {integrante.redes.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-team-social-link"
                >
                  {red.nombre}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Collapse>
    </article>
  );
}

function Nosotros() {
  return (
    <Container className="py-5">
      <h1 className="h2 page-title mb-3">Sobre Coronados Tech-Hardware</h1>
      <p className="text-secondary mb-4">
        Arrancamos con la pasión por el hardware. Somos un emprendimiento de componentes de PC
        para los que quieren armar, actualizar o mantener su máquina con buenas piezas.
      </p>

      <Row xs={1} md={2} className="g-4 mb-5">
        <Col>
          <div className="about-pillar-card">
            <span className="about-pillar-label">Misión</span>
            <p className="about-pillar-text mb-0">
              Traer componentes de última generación con asesoramiento personalizado, para que
              cada uno arme la PC ideal según su bolsillo y lo que necesitás.
            </p>
          </div>
        </Col>
        <Col>
          <div className="about-pillar-card">
            <span className="about-pillar-label">Visión</span>
            <p className="about-pillar-text mb-0">
              Ser la tienda líder en hardware gamer y profesional en Argentina, con un catálogo
              de primera y la confianza de nuestra comunidad.
            </p>
          </div>
        </Col>
      </Row>

      <div className="mb-4">
        <h2 className="h4 page-title mb-1">Nuestro equipo</h2>
        <p className="text-secondary mb-0">Las personas detrás de Coronados.</p>
      </div>
      <Row xs={1} sm={2} className="g-4 mb-5">
        {integrantes.map((integrante) => (
          <Col key={integrante.id}>
            <CardIntegrante integrante={integrante} />
          </Col>
        ))}
      </Row>

      <div className="about-benefits">
        <div className="mb-4">
          <h2 className="h4 page-title mb-1">¿Por qué elegirnos?</h2>
          <p className="text-secondary mb-0">
            Lo que nos diferencia cuando armás o mejorás tu setup.
          </p>
        </div>
        <Row xs={1} sm={2} className="g-3">
          {BENEFICIOS.map((beneficio) => (
            <Col key={beneficio.titulo}>
              <div className="about-benefit-item">
                <h3 className="about-benefit-title">{beneficio.titulo}</h3>
                <p className="about-benefit-text mb-0">{beneficio.texto}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default Nosotros;
