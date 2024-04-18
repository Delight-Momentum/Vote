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
        style={{ width: '465px', display: 'flex', justifyContent: 'center' }}
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
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
    type: 'text',
    placeholder: '제목을 입력해 주세요',
  },
}

export const VoteInput: Story = {
  args: {
    type: 'text',
    placeholder: '1번 항목',
  },
}
