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
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="p-2 rounded-sm hover:bg-gray-100 transition-colors text-text-body hover:text-btn-black-bg"
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="text-lg font-semibold text-text-body">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>

        <button
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-sm hover:bg-gray-100 transition-colors text-text-body hover:text-btn-black-bg"
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
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
                aspect-square flex items-center justify-center text-sm rounded-sm transition-colors
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

      {selectedDate && (
        <div className="mt-6">
          <p className="text-sm font-medium text-text-body mb-3">
            Available time slots for{' '}
            <span className="font-semibold">
              {selectedDateObj
                ? format(selectedDateObj, 'MMMM d, yyyy')
                : ''}
            </span>
          </p>

          {slotsForSelectedDate.some((s) => s.available) ? (
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
                    py-2.5 px-1 text-sm rounded-sm font-medium transition-colors
                    ${
                      selectedTime === time
                        ? 'bg-btn-black-bg text-white'
                        : available
                          ? 'bg-white border border-gray-200 text-text-body hover:border-btn-black-bg hover:text-btn-black-bg'
                          : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'
                    }
                    focus:outline-none focus:ring-2 focus:ring-btn-black-bg/40
                  `}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No available time slots for this date.
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default AppointmentCalendar
