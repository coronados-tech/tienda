import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useBumpOnIncrease } from '../hooks/useBumpOnIncrease.js';
import ThemeToggle from './ThemeToggle.jsx';

function NavbarCoronados() {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const favoritesBumping = useBumpOnIncrease(totalFavorites);
  const cartBumping = useBumpOnIncrease(totalItems);

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
            <Nav.Link as={NavLink} to="/favoritos" className={linkClass}>
              ♥ Favoritos{' '}
              {totalFavorites > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className={`cart-badge ${favoritesBumping ? 'cart-badge-bump' : ''}`}
                >
                  {totalFavorites}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" className={linkClass}>
              🛒 Carrito{' '}
              {totalItems > 0 && (
                <Badge
                  bg="success"
                  pill
                  className={`cart-badge ${cartBumping ? 'cart-badge-bump' : ''}`}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
            <ThemeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCoronados;
