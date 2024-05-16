import Calendar from '@/assets/svgs/calendar'
import Clock from '@/assets/svgs/clock'
import { forwardRef } from 'react'

interface ICustomInputButton {
  type: 'date' | 'time'
  selectedDate?: () => string
  selectedTime?: () => string
}

const CustomInputButton = forwardRef<HTMLButtonElement, ICustomInputButton>(
  ({ type, selectedDate: dateFn, selectedTime: timeFn, ...rest }, ref) => {
    const elements = {
      date: {
        selectedDate: dateFn && dateFn(),
        DateIcon: <Calendar />,
      },
      time: {
        selectedTime: timeFn && timeFn(),
        TimeIcon: <Clock />,
      },
    }

    const renderContents = () => {
      const { selectedDate, DateIcon } = elements.date
      const { selectedTime, TimeIcon } = elements.time

      switch (type) {
        case 'date':
          return (
            <>
              {selectedDate}
              {DateIcon}
            </>
          )

        case 'time':
          return (
            <>
              {selectedTime}
              {TimeIcon}
            </>
          )

        default:
          return null
      }
    }
    return (
      <button type="button" ref={ref} {...rest}>
        {renderContents()}
      </button>
    )
  },
)

CustomInputButton.displayName = 'CustomInputButton'
export default CustomInputButton
