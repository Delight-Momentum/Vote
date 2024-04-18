import type { Meta, StoryObj } from '@storybook/react'
import VoteCard from '@/components/vote-card'

const meta = {
  title: 'Card/vote-card',
  component: VoteCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  argTypes: {
    voteTitle: { control: 'text' },
    voteItems: { control: 'array' },
    participantsCount: { control: 'number' },
    participateUrl: { control: 'text' },
  },
} satisfies Meta<typeof VoteCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    isClosed: false,
    voteTitle: '최고의 음식은?',
    voteItems: ['물냉면', '비빔냉면', '쫄면', '막국수'],
    participantsCount: 242,
    participateUrl: '/vote/1',
    participateResultUrl: '/vote/1/result',
  },
}
