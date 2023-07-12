import { format } from 'date-fns';
import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

const Calendar = () => {
    const [selectedRange, setSelectedRange] = useState('');
    const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

    const today = new Date()
    const defaultMonth = new Date(today.getFullYear(), today.getMonth())

    const handleRangeSelect = (range) => { 
        setSelectedRange(range);
        if (range?.from) {
          setFromValue(format(range.from, 'y-MM-dd'));
        } else {
          setFromValue('');
        }
        if (range?.to) {
          setToValue(format(range.to, 'y-MM-dd'));
        } else {
          setToValue('');
        }
      };

    return (
        <DayPicker
            // defaultMonth={isSameMonth(new Date(), 1)}
            defaultMonth={new Date(defaultMonth)}
            fromMonth={new Date(defaultMonth)}
            toYear={2025}
            numberOfMonths={2}
            pagedNavigation
            mode='range'
            selected={selectedRange}
            onSelect={handleRangeSelect}
        />
    )
}

export default Calendar
