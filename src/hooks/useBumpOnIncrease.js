import { useEffect, useRef, useState } from 'react';

export function useBumpOnIncrease(value) {
  const [bumping, setBumping] = useState(false);
  const prevRef = useRef(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevRef.current = value;
      return undefined;
    }

    if (value > prevRef.current) {
      setBumping(true);
      const timer = setTimeout(() => setBumping(false), 950);
      prevRef.current = value;
      return () => clearTimeout(timer);
    }

    prevRef.current = value;
    return undefined;
  }, [value]);

  return bumping;
}
