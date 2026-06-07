import { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ZOOM_LEVEL = 2.5;
const LENS_RATIO = 0.45;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ProductImageZoom({ src, alt }) {
  const containerRef = useRef(null);
  const isActiveRef = useRef(false);
  const [canHoverZoom, setCanHoverZoom] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [lens, setLens] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHoverZoom(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const updateLens = (clientX, clientY) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const lensWidth = rect.width * LENS_RATIO;
    const lensHeight = rect.height * LENS_RATIO;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setBounds({ width: rect.width, height: rect.height });
    setLens({
      x: clamp(x - lensWidth / 2, 0, rect.width - lensWidth),
      y: clamp(y - lensHeight / 2, 0, rect.height - lensHeight),
      width: lensWidth,
      height: lensHeight,
    });
  };

  const handleMouseEnter = (event) => {
    if (!canHoverZoom) return;
    isActiveRef.current = true;
    setIsActive(true);
    updateLens(event.clientX, event.clientY);
  };

  const handleMouseMove = (event) => {
    if (!canHoverZoom || !isActiveRef.current) return;
    updateLens(event.clientX, event.clientY);
  };

  const handleMouseLeave = () => {
    isActiveRef.current = false;
    setIsActive(false);
  };

  const handleClick = () => {
    if (!canHoverZoom) {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="product-image-zoom">
        <div
          ref={containerRef}
          className={`product-image-zoom-main ${isActive ? 'is-active' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onKeyDown={(event) => {
            if (!canHoverZoom && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              setShowModal(true);
            }
          }}
          tabIndex={canHoverZoom ? -1 : 0}
          role={canHoverZoom ? 'presentation' : 'button'}
          aria-label={canHoverZoom ? alt : `Ver imagen ampliada de ${alt}`}
        >
          <img src={src} alt={alt} className="detail-image" draggable={false} />
          {isActive && (
            <div
              className="product-image-zoom-lens"
              style={{
                width: lens.width,
                height: lens.height,
                transform: `translate(${lens.x}px, ${lens.y}px)`,
              }}
            />
          )}
          {!canHoverZoom && <span className="detail-image-zoom-hint">Tocá para ampliar</span>}
        </div>

        {canHoverZoom && isActive && bounds.width > 0 && (
          <div
            className="product-image-zoom-panel"
            style={{ width: bounds.width, height: bounds.height }}
          >
            <img
              src={src}
              alt=""
              aria-hidden
              draggable={false}
              className="product-image-zoom-panel-img"
              style={{
                width: bounds.width * ZOOM_LEVEL,
                height: bounds.height * ZOOM_LEVEL,
                transform: `translate(${-lens.x * ZOOM_LEVEL}px, ${-lens.y * ZOOM_LEVEL}px)`,
              }}
            />
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
        className="detail-image-modal"
      >
        <Modal.Header closeButton className="detail-image-modal-header border-0">
          <Modal.Title className="h6 mb-0">{alt}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detail-image-modal-body">
          <img src={src} alt={alt} className="detail-image-full" />
        </Modal.Body>
        <Modal.Footer className="detail-image-modal-footer border-0">
          <Button variant="outline-accent" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductImageZoom;