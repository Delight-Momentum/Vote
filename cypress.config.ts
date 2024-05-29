import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'q5roop',
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
})
