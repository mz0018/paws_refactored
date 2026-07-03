import { useCallback, useMemo, useState } from 'react'
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  isSameMonth,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ErrorText } from '../ui/form/ErrorText'

interface AppointmentCalendarProps {
  selectedDate: string
  selectedTime: string
  onDateChange: (date: Date | null) => void
  onTimeSelect: (time: string) => void
  filterTime: (date: Date) => boolean
  error?: string
}

const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const h = Math.floor(i / 2) + 8
  const m = i % 2 === 0 ? '00' : '30'
  return `${String(h).padStart(2, '0')}:${m}`
})

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const AppointmentCalendar = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeSelect,
  filterTime,
  error,
}: AppointmentCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      return new Date(selectedDate + 'T00:00:00')
    }
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const todayStr = format(new Date(), 'yyyy-MM-dd')

  const isPastDate = useCallback(
    (date: Date) => format(date, 'yyyy-MM-dd') < todayStr,
    [todayStr]
  )

  const generateTimeSlotsForDate = useCallback(
    (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      return TIME_SLOTS.map((slot) => {
        const d = new Date(`${dateStr}T${slot}:00`)
        return { time: slot, available: filterTime(d) }
      })
    },
    [filterTime]
  )

  const isFullyBooked = useCallback(
    (date: Date) => {
      if (isPastDate(date)) return true
      return generateTimeSlotsForDate(date).every((s) => !s.available)
    },
    [generateTimeSlotsForDate, isPastDate]
  )

  const getFirstAvailableTime = useCallback(
    (date: Date) => {
      const slots = generateTimeSlotsForDate(date)
      const available = slots.find((s) => s.available)
      return available?.time ?? null
    },
    [generateTimeSlotsForDate]
  )

  const handleDayClick = useCallback(
    (day: Date) => {
      if (isPastDate(day) || isFullyBooked(day)) return
      const firstSlot = getFirstAvailableTime(day)
      if (firstSlot) {
        const [h, m] = firstSlot.split(':').map(Number)
        const dateTime = new Date(format(day, 'yyyy-MM-dd') + 'T00:00:00')
        dateTime.setHours(h, m, 0, 0)
        onDateChange(dateTime)
      }
    },
    [isPastDate, isFullyBooked, getFirstAvailableTime, onDateChange]
  )

  const selectedDateObj = useMemo(
    () => (selectedDate ? new Date(selectedDate + 'T00:00:00') : null),
    [selectedDate]
  )

  const slotsForSelectedDate = useMemo(
    () =>
      selectedDate
        ? generateTimeSlotsForDate(new Date(selectedDate + 'T00:00:00'))
        : [],
    [selectedDate, generateTimeSlotsForDate]
  )

  const gridDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1))
  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1))

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                Select Date
            </p>

            <h2 className="text-2xl font-bold text-text-body">
                {format(currentMonth, 'MMMM yyyy')}
            </h2>
        </div>

        <div className="flex gap-2">
            <button
                type="button"
                onClick={prevMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-body transition hover:border-btn-black-bg hover:text-btn-black-bg"
                aria-label="Previous month"
            >
                <ChevronLeft size={18} />
            </button>

            <button
                type="button"
                onClick={nextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-text-body transition hover:border-btn-black-bg hover:text-btn-black-bg"
                aria-label="Next month"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div role="grid" aria-label="Calendar" className="grid grid-cols-7">
        {gridDays.map((day, idx) => {
          const inCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDateObj && isSameDay(day, selectedDateObj)
          const isTodayDate = isToday(day)
          const isDisabled =
            !inCurrentMonth || isPastDate(day) || isFullyBooked(day)

          return (
            <button
              key={format(day, 'yyyy-MM-dd') + idx}
              type="button"
              role="gridcell"
              disabled={isDisabled}
              aria-label={format(day, 'EEEE, MMMM d, yyyy')}
              aria-selected={isSelected ?? false}
              aria-current={isTodayDate ? 'date' : undefined}
              onClick={() => handleDayClick(day)}
              className={`
                h-11
                w-11
                mx-auto
                flex
                items-center
                justify-center
                rounded-full
                text-sm
                transition-all
                duration-200
                ${!inCurrentMonth ? 'text-gray-300' : ''}
                ${
                  isSelected
                    ? 'bg-btn-black-bg text-white font-semibold'
                    : isTodayDate && inCurrentMonth
                      ? 'font-semibold text-btn-black-bg ring-2 ring-btn-black-bg/50'
                      : ''
                }
                ${
                  !isSelected && inCurrentMonth && !isDisabled
                    ? 'hover:bg-btn-black-bg/10 text-text-body cursor-pointer'
                    : ''
                }
                ${isDisabled && inCurrentMonth ? 'text-gray-300 cursor-not-allowed' : ''}
                ${!isDisabled ? 'cursor-pointer' : 'cursor-not-allowed'}
                focus:outline-none focus:ring-2 focus:ring-btn-black-bg/40 focus:ring-offset-1
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Select Time
          </p>

          <h3 className="text-lg font-semibold text-text-body">
            {selectedDateObj
              ? format(selectedDateObj, 'MMMM d, yyyy')
              : 'Choose a date first'}
          </h3>
        </div>

        {!selectedDate ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">
              Select a date from the calendar to view available time slots.
            </p>
          </div>
        ) : slotsForSelectedDate.some((s) => s.available) ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {slotsForSelectedDate.map(({ time, available }) => (
              <button
                key={time}
                type="button"
                disabled={!available}
                aria-label={`${time}${available ? '' : ' (unavailable)'}`}
                aria-pressed={selectedTime === time}
                onClick={() => onTimeSelect(time)}
                className={`
                  h-11 rounded-full text-sm font-medium transition-all
                  ${
                    selectedTime === time
                      ? 'bg-btn-black-bg text-white shadow-md'
                      : available
                      ? 'border border-gray-200 bg-white hover:border-btn-black-bg hover:bg-btn-black-bg/5'
                      : 'border border-gray-100 bg-gray-100 text-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              No available time slots for this date.
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="pt-2">
          <ErrorText message={error} />
        </div>
      )}
    </div>
  )
}

export default AppointmentCalendar
