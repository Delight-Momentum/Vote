import type { Preview } from '@storybook/react'
import '@fontsource-variable/noto-sans-kr'
import '@/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
