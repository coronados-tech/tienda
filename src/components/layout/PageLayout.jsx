import { Container } from 'react-bootstrap';

/**
 * Patrón Composite (estructural en UI): compone título + contenido + secciones
 * en una misma plantilla reutilizable para las páginas internas.
 */
function PageLayout({ titulo, subtitulo, children, fluid = false }) {
  const Wrapper = fluid ? 'div' : Container;

  return (
    <Wrapper className={fluid ? '' : 'py-5'}>
      {(titulo || subtitulo) && (
        <header className="mb-4">
          {titulo && <h1 className="h2 page-title">{titulo}</h1>}
          {subtitulo && <p className="text-secondary mb-0">{subtitulo}</p>}
        </header>
      )}
      {children}
    </Wrapper>
  );
}

export default PageLayout;
