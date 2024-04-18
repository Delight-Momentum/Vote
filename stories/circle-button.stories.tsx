import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import CircleButton from '@/components/circle-button'

const meta = {
  title: 'Buttons/CircleButton',
  component: CircleButton,
  parameters: {
    layout: 'centered',
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
    isDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: false,
    },
    children: {
      control: 'text',
      description: 'button의 내용',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트',
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
    isDisabled: false,
  },
}

export const Normal: Story = {
  args: {
    children: '참여하기',
    theme: 'normal',
    isDisabled: false,
  },
}

export const Big: Story = {
  args: {
    children: '참여하기',
    theme: 'big',
    isDisabled: false,
  },
}

export const Disabled: Story = {
  args: {
    children: '참여하기',
    theme: 'big',
    isDisabled: true,
  },
}
