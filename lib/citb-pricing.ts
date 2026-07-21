/** CITB booking prices in GBP (pence for Stripe). */
export const CITB_BASE_PRICE_GBP = 45;
export const CITB_MULTI_TEST_ADDON_GBP = 20;

export function citbTotalGbp(multiTest: boolean): number {
  return CITB_BASE_PRICE_GBP + (multiTest ? CITB_MULTI_TEST_ADDON_GBP : 0);
}

export function citbTotalPence(multiTest: boolean): number {
  return citbTotalGbp(multiTest) * 100;
}
