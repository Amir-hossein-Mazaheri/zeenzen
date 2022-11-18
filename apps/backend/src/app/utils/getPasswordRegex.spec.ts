import { getPasswordRegex } from './getPasswordRegex';

describe('getPasswordRegex', () => {
  let regex: RegExp;

  beforeEach(() => {
    regex = getPasswordRegex();
  });

  it('should regex verify correctly', () => {
    expect(regex.test('amir')).toBe(false);

    expect(regex.test('amir123456')).toBe(true);

    expect(regex.test('Amir123456')).toBe(true);
  });
});
