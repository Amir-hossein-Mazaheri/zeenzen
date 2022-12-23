import '@testing-library/jest-dom';

// react markdown and its remark gfm plugin have issues with jest transpiler
jest.mock('remark-gfm', () => null);
