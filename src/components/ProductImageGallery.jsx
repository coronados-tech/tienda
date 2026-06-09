import { useState } from 'react';
import ProductImageZoom from './ProductImageZoom.jsx';

function ProductImageGallery({ images, alt }) {
  const gallery = images?.length ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!gallery.length) return null;

  const hasMultiple = gallery.length > 1;
  const safeIndex = Math.min(activeIndex, gallery.length - 1);

  const goPrev = () => {
    setActiveIndex((index) => (index === 0 ? gallery.length - 1 : index - 1));
  };

  const goNext = () => {
    setActiveIndex((index) => (index === gallery.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="product-image-gallery">
      <div className="product-image-gallery-main">
        {hasMultiple && (
          <button
            type="button"
            className="product-gallery-nav product-gallery-nav-prev"
            onClick={goPrev}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
        )}

        <ProductImageZoom
          key={safeIndex}
          src={gallery[safeIndex]}
          alt={`${alt} (vista ${safeIndex + 1})`}
        />

        {hasMultiple && (
          <button
            type="button"
            className="product-gallery-nav product-gallery-nav-next"
            onClick={goNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        )}
      </div>

      {hasMultiple && (
        <>
          <div className="product-gallery-thumbs" role="tablist" aria-label="Vistas del producto">
            {gallery.map((src, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={`Ver vista ${index + 1}`}
                className={`product-gallery-thumb ${index === safeIndex ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={src} alt="" />
              </button>
            ))}
          </div>
          <p className="product-gallery-counter text-secondary small text-center mb-0 mt-2">
            {safeIndex + 1} / {gallery.length}
          </p>
        </>
      )}
    </div>
  );
}

export default ProductImageGallery;
