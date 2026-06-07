import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { categoryToSlug } from '../utils/categories.js';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&h=500&fit=crop',
    titulo: 'Armá tu PC gamer',
    texto: 'Procesadores, GPUs y memorias de última generación.',
    categoria: 'Placas de video',
    cta: 'Ver placas de video',
  },
  {
    img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9df?w=1200&h=500&fit=crop',
    titulo: 'Almacenamiento ultrarrápido',
    texto: 'SSDs NVMe para cargar juegos y apps al instante.',
    categoria: 'Almacenamiento',
    cta: 'Ver almacenamiento',
  },
  {
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=500&fit=crop',
    titulo: 'Periféricos pro',
    texto: 'Teclados, mouse y monitores para competir al máximo.',
    categoria: 'Periféricos',
    cta: 'Ver periféricos',
  },
];

function BannerSlider() {
  return (
    <Carousel className="banner-carousel" fade indicators pause="hover">
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={slide.img} alt={slide.titulo} />
          <Carousel.Caption>
            <h2 className="fw-bold">{slide.titulo}</h2>
            <p className="mb-3">{slide.texto}</p>
            <Button
              as={Link}
              to={`/productos/categoria/${categoryToSlug(slide.categoria)}`}
              variant="accent"
            >
              {slide.cta}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerSlider;
