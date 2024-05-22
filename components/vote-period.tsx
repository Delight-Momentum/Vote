import { IDate } from '@/hooks/use-date-picker'
import { Label, PopoverDatePicker } from '.'

interface IVotePeriodProps {
  date: IDate
  selectedDate: () => string
  selectedTime: () => string
  handleDateChange: (newDate: IDate) => void
}

function VotePeriod({
  date,
  selectedDate,
  selectedTime,
  handleDateChange,
}: IVotePeriodProps) {
  return (
    <div className="flex w-full flex-col gap-10pxr">
      <Label htmlFor="votePeriod" theme="small">
        투표 기간
      </Label>
      <div className="flex h-100pxr w-full flex-col items-center justify-between rounded-lg bg-white px-24pxr py-16pxr sm:h-56pxr sm:flex-row">
        <PopoverDatePicker
          type="date"
          date={date}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <div className="h-1pxr w-full bg-[#b0b0b0] sm:h-35pxr sm:w-1pxr" />
        <PopoverDatePicker
          type="time"
          date={date}
          selectedTime={selectedTime}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  )
}

export default VotePeriod
