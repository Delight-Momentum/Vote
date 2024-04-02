const { Config } = require('jest')

const config = {
  coverageProvider: 'v8',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}

module.exports = config
