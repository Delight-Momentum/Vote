import nextJest from 'next/jest'

const createJestConfig = nextJest()
const customJestConfig = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
}

export default createJestConfig(customJestConfig)
