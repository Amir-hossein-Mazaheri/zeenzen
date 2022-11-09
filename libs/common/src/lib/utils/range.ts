export function* rangeIterator(count: number, start = 0, step = 1) {
  for (let i = start; i < count + start; i += step) {
    yield i;
  }
}

export function range(count: number, start = 0, step = 1) {
  const rangeNumbers: number[] = [];

  for (let i = start; i < count + start; i += step) {
    rangeNumbers.push(i);
  }

  return rangeNumbers;
}
