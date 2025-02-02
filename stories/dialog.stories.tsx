import type { Meta, StoryObj } from '@storybook/react'
import { HttpResponse, http } from 'msw'
import Dialog from '@/components/dialog'
import DeleteDialog from '@/components/dialog-delete'
import useModal from '@/hooks/use-modal'

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    backgrounds: { default: 'dark' },
    msw: {
      handlers: [
        http.delete('https://vote-server.xyz/api/vote/1', () => {
          return HttpResponse.json({
            message: 'mocked response',
          })
        }),
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Delete: Story = {
  args: {
    isOpen: false,
    children: <DeleteDialog voteId="1" onClose={() => {}} />,
  },
  render: () => {
    const { isDialogOpen, dialogOutSideClick, setIsDialogOpen, dialogRef } =
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useModal()
    return (
      <>
        <button
          type="button"
          className="bg-white p-20pxr text-black"
          onClick={() => setIsDialogOpen(true)}
        >
          삭제하기
        </button>
        <Dialog
          isOpen={isDialogOpen}
          dialogOutSideClick={dialogOutSideClick}
          dialogRef={dialogRef}
        >
          <DeleteDialog voteId="1" onClose={() => setIsDialogOpen(false)} />
        </Dialog>
      </>
    )
  },
}
