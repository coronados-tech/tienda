import { useMemo, useState } from 'react';
import { calculateOrderDiscount } from '../patterns/strategy/discountStrategies.js';

export function useCoupon(totalAmount, initialApplied = '') {
  const [couponInput, setCouponInput] = useState(initialApplied);
  const [appliedCoupon, setAppliedCoupon] = useState(initialApplied);

  const pricing = useMemo(
    () => calculateOrderDiscount(totalAmount, appliedCoupon),
    [totalAmount, appliedCoupon]
  );

  const couponFeedback = useMemo(() => {
    const code = appliedCoupon.trim().toUpperCase();
    if (!code) return null;
    if (code === 'NEW') {
      const hasCoupon = pricing.appliedDiscounts.some((discount) => discount.id === 'coupon-new');
      if (hasCoupon) {
        const hasBulk = pricing.appliedDiscounts.some((discount) => discount.id === 'bulk');
        return {
          variant: 'success',
          text: hasBulk
            ? 'Cupón NEW aplicado. Se acumula con el descuento automático del 15%.'
            : 'Cupón NEW aplicado: 10% de descuento.',
        };
      }
      return { variant: 'warning', text: 'El código ingresado no es válido.' };
    }
    return { variant: 'warning', text: 'El código ingresado no es válido.' };
  }, [appliedCoupon, pricing.appliedDiscounts]);

  const handleApplyCoupon = () => {
    setAppliedCoupon(couponInput.trim());
  };

  return {
    couponInput,
    setCouponInput,
    appliedCoupon,
    pricing,
    couponFeedback,
    handleApplyCoupon,
  };
}
