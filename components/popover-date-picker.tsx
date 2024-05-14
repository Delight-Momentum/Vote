import Clock from '@/assets/svgs/clock'
import Calender from '@/assets/svgs/calender'
import { IDate } from '@/hooks/useDatePicker'
import useModal from '@/hooks/useModal'
import DatePicker from 'react-datepicker'

interface IModalDatePickerProps {
  type: 'date' | 'time'
  date: IDate
  selectedDate?: () => string
  selectedTime?: () => string
  onDateChange: (newDate: IDate) => void
}

function PopoverDatePicker({
  type,
  date,
  selectedDate,
  selectedTime,
  onDateChange,
}: IModalDatePickerProps) {
  const { isDialogOpen, setIsDialogOpen } = useModal()

  const handleDatePickerClose = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="relative">
      {type === 'date' && selectedDate ? (
        <>
          <button
            className="flex gap-9pxr text-16pxr font-semibold text-primary300"
            type="button"
            onClick={() => setIsDialogOpen(true)}
          >
            {selectedDate()}
            <Calender />
          </button>
          {isDialogOpen && (
            <div className="absolute left-0pxr top-30pxr z-10">
              <DatePicker
                selected={date.endDate}
                onChange={(selectedDates) => {
                  onDateChange({
                    ...date,
                    startDate: new Date(),
                    endDate: selectedDates,
                  })
                }}
                onClickOutside={handleDatePickerClose}
                minDate={new Date()}
                selectsStart
                inline
              />
            </div>
          )}
        </>
      ) : (
        <>
          <button
            className="flex gap-48pxr text-16pxr font-semibold text-primary300"
            type="button"
            onClick={() => setIsDialogOpen(true)}
          >
            {selectedTime && selectedTime()}
            <Clock />
          </button>
          {isDialogOpen && (
            <div className="absolute right-0pxr top-30pxr z-10">
              <DatePicker
                selected={date.startDate}
                onChange={(selectTime) => {
                  onDateChange({
                    ...date,
                    time: selectTime,
                  })
                }}
                onClickOutside={handleDatePickerClose}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                inline
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PopoverDatePicker
