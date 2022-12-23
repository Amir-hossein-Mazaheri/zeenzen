import '@testing-library/jest-dom';

import { server } from './__mocks__/server';

// react markdown and its remark gfm plugin have issues with jest transpiler
jest.mock('remark-gfm', () => null);

jest.mock('@formkit/auto-animate/react', () => {
  return {
    useAutoAnimate: () => [{ current: void 0 }],
  };
});

jest.mock('./src/hooks/useSkipForUsers.ts', () => () => null);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
