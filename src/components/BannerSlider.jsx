import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categoryToSlug } from '../utils/categories.js';
import gpuBanner from '../assets/fotosProductos/product-3-1.png';
import storageBanner from '../assets/fotosProductos/product-7-1.png';
import monitorBanner from '../assets/fotosProductos/product-12-1.png';

const slides = [
  {
    img: gpuBanner,
    titulo: 'Armá tu PC gamer',
    texto: 'Procesadores, GPUs y memorias de última generación.',
    categoria: 'Placas de video',
    cta: 'Ver placas de video',
  },
  {
    img: storageBanner,
    titulo: 'Almacenamiento ultrarrápido',
    texto: 'SSDs NVMe para cargar juegos y apps al instante.',
    categoria: 'Almacenamiento',
    cta: 'Ver almacenamiento',
  },
  {
    img: monitorBanner,
    titulo: 'Monitores de alto rendimiento',
    texto: 'Pantallas 4K y 1440p para gaming y productividad.',
    categoria: 'Monitores',
    cta: 'Ver monitores',
  },
];

function BannerSlider() {
  return (
    <Carousel className="banner-carousel" fade indicators pause="hover">
      {slides.map((slide) => (
        <Carousel.Item key={slide.titulo}>
          <div className="banner-slide">
            <div className="banner-slide-content">
              <h2 className="fw-bold">{slide.titulo}</h2>
              <p className="mb-4">{slide.texto}</p>
              <Button
                as={Link}
                to={`/productos/categoria/${categoryToSlug(slide.categoria)}`}
                variant="accent"
              >
                {slide.cta}
              </Button>
            </div>
            <div className="banner-slide-media">
              <img src={slide.img} alt={slide.titulo} />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerSlider;
