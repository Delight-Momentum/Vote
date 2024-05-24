'use client'

import { IDate } from '@/hooks/use-date-picker'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ko } from 'date-fns/locale/ko'
import filterPassedTime from 'utils/filter-passed-time'
import useMediaQueries from '@/hooks/use-media-queries'
import { CustomInputButton } from '.'

registerLocale('ko', ko)

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
  const mobileMediaQuery = useMediaQueries({ breakpoint: 639 })?.mediaQuery
    .matches

  const isMobile = typeof window !== 'undefined' ? mobileMediaQuery : false

  const renderDatePicker = () => {
    switch (type) {
      case 'date':
        return (
          <DatePicker
            className="flex gap-4pxr text-16pxr font-semibold text-primary300 sm:gap-9pxr"
            selected={date.endDate}
            onChange={(selectedDates) => {
              onDateChange({
                ...date,
                startDate: new Date(),
                endDate: selectedDates,
              })
            }}
            minDate={new Date()}
            selectsStart
            customInput={
              <CustomInputButton type={type} selectedDate={selectedDate} />
            }
            enableTabLoop={false}
            showPopperArrow={false}
            locale="ko"
            withPortal={isMobile}
          />
        )

      case 'time':
        return (
          <DatePicker
            className="flex gap-4pxr text-16pxr font-semibold text-primary300 sm:gap-48pxr"
            selected={date.time}
            onChange={(selectTime) => {
              onDateChange({
                ...date,
                time: selectTime,
              })
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            customInput={
              <CustomInputButton type={type} selectedTime={selectedTime} />
            }
            timeCaption="마감 시간"
            filterTime={filterPassedTime}
            showPopperArrow={false}
            enableTabLoop={false}
            locale="ko"
            withPortal={isMobile}
          />
        )
      default:
        return null
    }
  }
  return renderDatePicker()
}

export default PopoverDatePicker
