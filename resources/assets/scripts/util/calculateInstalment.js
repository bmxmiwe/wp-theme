export default function calculateInstalment(total, apr, time) {
  return Math.ceil(doCompoundCalculation(total, apr, time * 12));

  function doCompoundCalculation(L, r, n) {
    // L is loan amount
    // r is APR
    // n is number of months
    return L * r * Math.pow(1 + r / 1200, n) / (1200 * (Math.pow(1 + r / 1200, n) - 1));
  }
}
