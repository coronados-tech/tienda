/**
 * Strategy pattern: each discount rule is an interchangeable strategy.
 * Applicable strategies stack on the subtotal (their amounts add up).
 */

export const BULK_DISCOUNT_THRESHOLD = 300_000;

const discountStrategies = {
  bulk: {
    id: 'bulk',
    label: 'Compra mayor a $300.000',
    percentage: 0.15,
    applies: (subtotal) => subtotal > BULK_DISCOUNT_THRESHOLD,
  },
  couponNew: {
    id: 'coupon-new',
    label: 'Cupón NEW',
    percentage: 0.1,
    applies: (_subtotal, couponCode) => couponCode.trim().toUpperCase() === 'NEW',
  },
};

export function calculateOrderDiscount(subtotal, couponCode = '') {
  const applicable = Object.values(discountStrategies).filter((strategy) =>
    strategy.applies(subtotal, couponCode)
  );

  const appliedDiscounts = applicable.map((strategy) => ({
    id: strategy.id,
    label: strategy.label,
    percentage: strategy.percentage,
    amount: Math.round(subtotal * strategy.percentage),
  }));

  const discountAmount = appliedDiscounts.reduce((acc, discount) => acc + discount.amount, 0);
  const total = subtotal - discountAmount;

  return {
    subtotal,
    discountAmount,
    total,
    appliedDiscounts,
  };
}
