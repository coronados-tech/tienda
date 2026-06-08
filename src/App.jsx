import { Routes, Route } from "react-router-dom";
import NavbarCoronados from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Home.jsx";
import Productos from "./pages/Products.jsx";
import DetalleProducto from './pages/ProductDetail.jsx';
import Contacto from "./pages/Contact.jsx";
import Nosotros from "./pages/About.jsx";
import Carrito from './pages/Cart.jsx';

function App() {
  return (
    <div className="app-layout">
      <NavbarCoronados />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route
            path="/productos/categoria/:categoriaSlug"
            element={<Productos />}
          />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
