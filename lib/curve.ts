export const curve = {
  // Pump.fun style bonding curve
  priceAtSupply(supply: number) {
    // simple bonding curve: price = 0.000001 * supply
    return supply * 0.000001;
  },

  marketCap(supply: number) {
    return supply * this.priceAtSupply(supply);
  },
};
