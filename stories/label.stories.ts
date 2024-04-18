import type { Meta, StoryObj } from '@storybook/react'
import Label from '@/components/label'

const meta = {
  title: 'Text/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: { control: 'text', description: 'label의 for 속성' },
    children: { control: 'text', description: 'label의 내용' },
    theme: {
      control: {
        type: 'select',
        option: ['small', 'normal', 'big'],
      },
      description: '라벨 테마',
      defaultValue: 'normal',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    htmlFor: 'title',
    children: '투표 제목',
    theme: 'small',
  },
}

export const Normal: Story = {
  args: {
    htmlFor: 'title',
    children: '투표 제목',
    theme: 'normal',
  },
}

export const Big: Story = {
  args: {
    htmlFor: 'title',
    children: '투표 제목',
    theme: 'big',
  },
}
