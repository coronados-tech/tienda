import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext.jsx';

function NavbarCoronados() {
  const { cart } = useCart();
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <Navbar expand="lg" className="navbar-coronados" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-mono">
          ⚡ Coronados <span className="text-accent">Tech-Hardware</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-1">
            <Nav.Link as={NavLink} to="/" end className={linkClass}>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className={linkClass}>
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros" className={linkClass}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto" className={linkClass}>
              Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className={linkClass}>
              🛒 Carrito
              {cart.length > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCoronados;