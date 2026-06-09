import { Button } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useActionAnimation } from '../hooks/useActionAnimation.js';

function FavoriteButton({ productId, variant = 'overlay', size = 'sm', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(productId);
  const { active: justAdded, trigger: triggerAdded } = useActionAnimation(1200);
  const { active: justRemoved, trigger: triggerRemoved } = useActionAnimation(600);

  const label = active ? 'Quitar de favoritos' : 'Agregar a favoritos';

  const handleClick = () => {
    if (active) {
      triggerRemoved();
    } else {
      triggerAdded();
    }
    toggleFavorite(productId);
  };

  const animClass =
    justAdded ? 'favorite-btn-just-added' : justRemoved ? 'favorite-btn-just-removed' : '';

  if (variant === 'overlay') {
    return (
      <button
        type="button"
        className={`favorite-btn-overlay ${active ? 'favorite-btn-active' : ''} ${animClass} ${className}`}
        onClick={handleClick}
        aria-label={label}
        aria-pressed={active}
        title={label}
      >
        <span className="favorite-btn-icon" aria-hidden="true">
          {active ? '♥' : '♡'}
        </span>
      </button>
    );
  }

  return (
    <Button
      variant={active ? 'accent' : 'outline-accent'}
      size={size}
      className={`${animClass} ${className}`}
      onClick={handleClick}
      aria-label={label}
      aria-pressed={active}
    >
      <span className="favorite-btn-icon" aria-hidden="true">
        {active ? '♥' : '♡'}
      </span>{' '}
      {active ? 'En favoritos' : 'Agregar a favoritos'}
    </Button>
  );
}

export default FavoriteButton;
