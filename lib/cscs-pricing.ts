/** CSCS card application price in GBP. */
export const CSCS_CARD_PRICE_GBP = 65;

export function cscsCardPricePence(): number {
  return CSCS_CARD_PRICE_GBP * 100;
}
