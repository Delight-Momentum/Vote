import type { Meta, StoryObj } from '@storybook/react'
import ProgressBar from '@/components/progress-bar'

const meta = {
  title: 'ProgressBar/progress-bar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '465px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    voteItem: { control: 'text' },
    choiceCount: { control: 'number' },
    participantCounts: { control: 'number' },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    contentId: 1,
    voteItem: '짬뽕',
    choiceCount: 123,
    participantCounts: 263,
  },
}
