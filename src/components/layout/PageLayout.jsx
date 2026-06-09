import { Container } from 'react-bootstrap';

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
