module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/spec/(.*)': '<rootDir>/spec/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/spec'],
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
