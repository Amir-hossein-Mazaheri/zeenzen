export function getMinMaxRange(digitsCount: number) {
  const min = 10 ** (digitsCount - 1);
  const max = 10 ** digitsCount - 1;

  return [min, max];
}
