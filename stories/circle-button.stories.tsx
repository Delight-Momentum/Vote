import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import CircleButton from '@/components/circle-button'

const meta = {
  title: 'Buttons/CircleButton',
  component: CircleButton,
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
    theme: {
      control: {
        type: 'select',
        option: ['small', 'normal', 'big'],
      },
      description: '버튼 테마',
      defaultValue: 'normal',
    },
    children: {
      control: 'text',
      description: 'button의 내용',
    },
  },

  args: { onClick: fn() },
} satisfies Meta<typeof CircleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    children: '참여하기',
    theme: 'small',
    disabled: false,
  },
}

export const Normal: Story = {
  args: {
    children: '참여하기',
    theme: 'normal',
    disabled: false,
  },
}

export const Big: Story = {
  args: {
    children: '참여하기',
    theme: 'big',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    children: '참여하기',
    theme: 'big',
    disabled: true,
  },
}
