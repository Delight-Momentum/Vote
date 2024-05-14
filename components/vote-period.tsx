import { IDate } from '@/hooks/useDatePicker'
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
    <div className="flex flex-col gap-10pxr">
      <Label htmlFor="votePeriod" theme="small">
        투표 기간
      </Label>
      <div className="flex h-56pxr items-center justify-between rounded-lg bg-white px-24pxr py-16pxr">
        <PopoverDatePicker
          type="date"
          date={date}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <div className="h-35pxr w-1pxr bg-[#b0b0b0]" />
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
