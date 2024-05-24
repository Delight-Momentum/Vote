import SearchBar from '@/components/search-bar'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Input/search-bar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{ width: '621px', display: 'flex', justifyContent: 'center' }}
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
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const searchBar: Story = {
  args: {
    placeholder: '투표 만들기',
    onChange: () => console.log('Changed'),
  },
}
