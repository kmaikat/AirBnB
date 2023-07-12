import { format, isSameMonth, isToday } from 'date-fns'
import isThisYear from 'date-fns/isThisYear'
import startOfToday from 'date-fns/startOfToday'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const Calendar = () => {
    const today = new Date()
    const defaultMonth = new Date(today.getFullYear(), today.getMonth())

    return (
        <DayPicker
            // defaultMonth={isSameMonth(new Date(), 1)}
            defaultMonth={new Date(defaultMonth)}
            fromMonth={new Date(defaultMonth)}
            toYear={2025}
            numberOfMonths={2}
            pagedNavigation
            mode='range'
        />
    )
}

export default Calendar
