import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Form, InputGroup, Button, Card } from "react-bootstrap";
import { products, categories, formatPrice } from "../data/products.js";
/*import ProductCard from "../components/ProductCard.jsx";*/
import PageLayout from "../components/layout/PageLayout.jsx";
import { applyCatalog } from "../patterns/composite/applyCatalog.js";
import {
  categoryToSlug,
  slugToCategory,
  availableTags,
} from "../utils/categories.js";

function Productos() {
  const { categoriaSlug } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [tag, setTag] = useState("Todas");
  const [sort, setSort] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    if (categoriaSlug) {
      const matchedCategory = slugToCategory(categoriaSlug);
      setCategory(matchedCategory ?? "Todas");
    } else {
      setCategory("Todas");
    }
  }, [categoriaSlug]);

  const filteredProducts = useMemo(
    () =>
      applyCatalog(products, {
        search,
        category,
        tag,
        sort,
        inStockOnly,
        maxPrice,
      }),
    [search, category, tag, sort, inStockOnly, maxPrice],
  );

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    if (newCategory === "Todas") {
      navigate("/productos");
    } else {
      navigate(`/productos/categoria/${categoryToSlug(newCategory)}`);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTag("Todas");
    setSort("default");
    setInStockOnly(false);
    setMaxPrice("");
    navigate("/productos");
  };

  return (
    <PageLayout
      titulo="Catálogo de productos"
      subtitulo={`${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""} encontrado${filteredProducts.length !== 1 ? "s" : ""}`}
    >
      <Row>
        <Col lg={3} className="mb-4">
          <div className="filter-panel sticky-lg-top" style={{ top: 90 }}>
            <h2 className="h6 mb-3">Filtros</h2>

            <Form.Group className="mb-3">
              <Form.Label>Buscar en productos</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Nombre o descripción..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Etiqueta</Form.Label>
              <Form.Select value={tag} onChange={(e) => setTag(e.target.value)}>
                <option value="Todas">Todas</option>
                {availableTags.map((availableTag) => (
                  <option key={availableTag} value={availableTag}>
                    {availableTag}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio máximo (ARS)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 500000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ordenar por precio</Form.Label>
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sin ordenar</option>
                <option value="ascending">Menor a mayor</option>
                <option value="descending">Mayor a menor</option>
              </Form.Select>
            </Form.Group>

            <Form.Check
              type="switch"
              id="solo-stock"
              label="Solo con stock disponible"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="mb-3"
            />

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          </div>
        </Col>

        <Col lg={9}>
          {filteredProducts.length === 0 ? (
            <div className="empty-state bg-card rounded-4">
              <div className="empty-state-icon">🔍</div>
              <h3 className="h5">No se encontraron productos</h3>
              <p>Probá ajustando los filtros o la búsqueda.</p>
            </div>
          ) : (
            <Row xs={1} sm={2} xl={3} className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                  <Card className="bg-card h-100 product-card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                    />
                    <Card.Body>
                      <Card.Title className="h6">{product.name}</Card.Title>
                      <Card.Text className="text-accent fw-bold">
                        {formatPrice(product.price)}
                      </Card.Text>
                      <Button
                        as={Link}
                        to={`/producto/${product.id}`}
                        variant="outline-accent"
                        size="sm"
                      >
                        Ver detalle
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </PageLayout>
  );
}

export default Productos;
