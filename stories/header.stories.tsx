import type { Meta, StoryObj } from '@storybook/react'
import Header from '@/components/header'

const meta = {
  title: 'Header/header',
  component: Header,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '1440px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: '투표하기',
  },
}
