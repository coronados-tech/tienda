import { useCallback, useEffect, useState } from 'react';

export function useActionAnimation(duration = 950) {
  const [active, setActive] = useState(false);

  const trigger = useCallback(() => {
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const timer = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  return { active, trigger };
}
