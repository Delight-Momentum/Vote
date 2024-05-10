import ButtonRound from '@/components/button-round'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Buttons/Round',
  component: ButtonRound,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '버튼의 클래스네임',
      defaultValue: '',
    },
    variant: {
      control: {
        type: 'select',
        option: ['primary', 'outline'],
      },
      description: '버튼의 종류',
      defaultValue: 'primary',
    },
    size: {
      control: {
        type: 'select',
        option: ['lg', 'sm'],
      },
      description: '버튼의 사이즈',
      defaultValue: 'lg',
    },
    children: {
      control: 'text',
      description: '버튼의 내용',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof ButtonRound>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'lg',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    children: 'button',
    variant: 'secondary',
    size: 'lg',
    disabled: false,
  },
}

export const disabled: Story = {
  args: {
    children: 'button',
    variant: 'primary',
    size: 'lg',
    disabled: true,
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'button',
    variant: 'primary',
    disabled: false,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'button',
    variant: 'primary',
    disabled: false,
  },
}
