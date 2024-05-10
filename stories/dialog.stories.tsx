import type { Meta, StoryObj } from '@storybook/react'
import Dialog from '@/components/dialog'
import DeleteDialog from '@/components/dialog-delete'
import useModal from '@/hooks/useModal'

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Delete: Story = {
  args: {
    isOpen: false,
    children: <DeleteDialog />,
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
          <DeleteDialog />
        </Dialog>
      </>
    )
  },
}
