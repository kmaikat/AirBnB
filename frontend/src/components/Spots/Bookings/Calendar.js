import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { useState } from 'react';
import { DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import './Calendar.css'

const Calendar = ({setShowCalendar, setFromValue, setToValue, fromValue, toValue}) => {
    const [selectedRange, setSelectedRange] = useState('');

    const today = new Date()
    const defaultMonth = new Date(today.getFullYear(), today.getMonth())

    const handleRangeSelect = (range) => {
        setSelectedRange(range);
        if (range?.from) {
            setFromValue(format(range.from, 'P'));
        } else {
            setFromValue('');
        }
        if (range?.to) {
            setToValue(format(range.to, 'P'));
        } else {
            setToValue('');
        }
    };

    const handleFromChange = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, 'P', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    };

    const handleToChange = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, 'P', new Date());

        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };


    return (
        <>
            <div className='booking-modal-header'>
                <div className='booking-modal-header-left'>
                    <div>Select dates</div>
                    <div>Add your travel dates for exact pricing</div>
                </div>
                <div className='checkin-checkout-container'>
                    <div>
                        <label>CHECK-IN</label>
                        <input
                            placeholder='MM/DD/YYYY'
                            value={fromValue}
                            onChange={handleFromChange}
                        />
                    </div>
                    <div>
                        <label>CHECKOUT</label>
                        <input
                            placeholder='MM/DD/YYYY'
                            value={toValue}
                            onChange={handleToChange}
                        />
                    </div>
                </div>
            </div>
            <DayPicker
                defaultMonth={new Date(defaultMonth)}
                fromMonth={new Date(defaultMonth)}
                toYear={2025}
                numberOfMonths={2}
                pagedNavigation
                mode='range'
                format='P'
                selected={selectedRange}
                onSelect={handleRangeSelect}
            />
            <div className='booking-calendar-footer'>
            <button className="calendar-close-button" onClick={() => setShowCalendar(false)}>Cancel</button>
            </div>
        </>
    )
}

export default Calendar
