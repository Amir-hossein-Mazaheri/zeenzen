import { type Config } from 'jest';
import nextJest from 'next/jest';
import { join } from 'path';

const createJestConfig = nextJest();

const config: Config = {
  displayName: 'shop',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/shop',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '@zeenzen/common': join(process.cwd(), 'libs', 'common', 'src', 'index.ts'),
    '@zeenzen/data': join(process.cwd(), 'libs', 'data', 'src', 'index.ts'),
    '@zeenzen/database': join(
      process.cwd(),
      'libs',
      'database',
      'src',
      'index.ts'
    ),
  },
};

const withNext = createJestConfig(config);

export default withNext;
