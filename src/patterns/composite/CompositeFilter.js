/**
 * Composite pattern: groups several filter strategies and applies them
 * as a single object. The catalog page does not know each filter separately.
 */
export class CompositeFilter {
  constructor() {
    this.strategies = [];
  }

  add(strategy) {
    this.strategies.push(strategy);
    return this;
  }

  filter(products) {
    return this.strategies.reduce(
      (result, strategy) => result.filter(strategy),
      products
    );
  }
}
