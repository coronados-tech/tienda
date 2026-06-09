import { useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  buildProductShareText,
  getWhatsAppShareUrl,
  getTwitterShareUrl,
} from '../utils/shareProduct.js';

function ShareButtons({ product }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildProductShareText(product));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="share-buttons mb-4">
      <p className="text-secondary small mb-2 fw-semibold">Compartir producto</p>
      <div className="d-flex flex-wrap gap-2">
        <Button
          as="a"
          href={getWhatsAppShareUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-success"
          size="sm"
          className="share-btn"
        >
          WhatsApp
        </Button>
        <Button
          as="a"
          href={getTwitterShareUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-light"
          size="sm"
          className="share-btn"
        >
          X
        </Button>
        <Button variant="outline-accent" size="sm" className="share-btn" onClick={handleCopy}>
          {copied ? '¡Copiado!' : 'Copiar info'}
        </Button>
      </div>
      {copied && (
        <p className="text-accent small mb-0 mt-2">
          Se copió el nombre, precio, descripción y enlace del producto.
        </p>
      )}
    </div>
  );
}

export default ShareButtons;
