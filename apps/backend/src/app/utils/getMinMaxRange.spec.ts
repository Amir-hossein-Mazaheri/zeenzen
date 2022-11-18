import { getMinMaxRange } from './getMinMaxRange';

describe('getMinMaxRange', () => {
  it('should get correct number range', () => {
    const [min, max] = getMinMaxRange(5);

    expect(min).toBe(10 ** 4);
    expect(max).toBe(10 ** 5 - 1);
  });
});
