import { Meta, StoryObj } from '@storybook/react'
import { FloatingButton } from '../components'

const meta = {
  title: 'Buttons/Floating',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FloatingButton>

export default meta
type Story = StoryObj<typeof meta>

export const Floating: Story = {}
