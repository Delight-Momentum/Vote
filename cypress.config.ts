import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'q5roop',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
