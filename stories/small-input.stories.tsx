import Input from '@/components/input'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Input/default-input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{ width: '225px', display: 'flex', justifyContent: 'center' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '인풋 텍스트',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password'],
      description: '텍스트 필드의 타입',
      defaultValue: 'text',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const nicknameInput: Story = {
  args: {
    type: 'text',
    placeholder: '닉네임을 입력해 주세요',
  },
}

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력해 주세요',
  },
}
