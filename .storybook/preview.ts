import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'

import '@fontsource-variable/noto-sans-kr'
import '@/styles/globals.css'

initialize()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
