import { getCode } from './getCode';

describe('getCode', () => {
  const LENGTH = 5;

  let code: number;

  let expiresAt: Date;

  beforeEach(async () => {
    const randomCode = await getCode(LENGTH, 10);

    code = randomCode.code;

    expiresAt = randomCode.expiresAt;
  });

  it('should get the correct length pass', async () => {
    expect(code.toString().length).toBe(LENGTH);
  });

  it('should get the current expiration date', async () => {
    expect(!isNaN(expiresAt.getTime())).toBe(true);
  });
});
