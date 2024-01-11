import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Calendar = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [currMonth, setCurrMonth] = useState(new Date());
    // console.log(currMonth)

    const handlePrevMonth = () => {
        const newMonth = new Date(currMonth);
        newMonth.setMonth(currMonth.getMonth() - 1);
        setCurrMonth(newMonth);
    }

    const handleNextMonth = () => {
        const newMonth = new Date(currMonth);
        newMonth.setMonth(currMonth.getMonth() + 1);
        setCurrMonth(newMonth);
    }

    const getDaysInPrevMonth = (firstDayOfMonth, startingDay) => {
        const daysInPrevMonth = [];
        const daysInPrevMonthCount = (startingDay + 6) % 7;

        for (let i = 1; i <= daysInPrevMonthCount; i++) {
            const date = new Date(firstDayOfMonth);
            date.setDate(firstDayOfMonth.getDate() - i);
            daysInPrevMonth.unshift(date);
        }
        return daysInPrevMonth;
    };

    const getDaysInCurrMonth = (lastDayOfMonth) => {
        return Array.from({ length: lastDayOfMonth.getDate() }, (_, day) => new Date(currMonth.getFullYear(), currMonth.getMonth(), day + 1));
    };

    const getDaysInNextMonth = (lastDayOfMonth, remainingDays) => {
        return new Array(remainingDays).fill(null).map((_, i) => {
            const date = new Date(lastDayOfMonth);
            date.setDate(lastDayOfMonth.getDate() + i + 1);
            return date;
        });
    };

    const getDays = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const startingDay = firstDayOfMonth.getDay();
        const daysInPrevMonth = getDaysInPrevMonth(firstDayOfMonth, startingDay);
        const daysInCurrMonth = getDaysInCurrMonth(lastDayOfMonth);
        const daysInNextMonth = getDaysInNextMonth(lastDayOfMonth, 42 - (daysInCurrMonth.length + daysInPrevMonth.length));
        console.log(daysInPrevMonth);
        console.log(daysInCurrMonth);
        console.log(daysInNextMonth);
        return [...daysInPrevMonth, ...daysInCurrMonth, ...daysInNextMonth];
    }

    const daysToShow = getDays(currMonth);
    const daysInRows = [];
    let currRow = [];
    daysToShow.forEach((date, index) => {
        currRow.push(date);
        if ((index + 1) % 7 === 0 || index === daysToShow.length - 1) {
            daysInRows.push(currRow);
            currRow = [];
        }
    });
    // console.log(daysInRows);

    const isToday = (dateToCheck) => {
        // Get today's date
        // const today = new Date('05-12-2022');
        const today = new Date();

        // Compare the components of the dateToCheck with today's date
        const isSameDate =
            dateToCheck.getDate() === today.getDate() &&
            dateToCheck.getMonth() === today.getMonth() &&
            dateToCheck.getFullYear() === today.getFullYear();

        // Return true if the dateToCheck is today, otherwise return false
        return isSameDate;
    };

    return (
        <div className='container mx-auto mt-2 w-96'>
            <div className='flex justify-between px-5'>
                <button className='' onClick={handlePrevMonth}>
                    <Icon icon="f7:lessthan" />
                </button>
                <h2 className='font-bold'>{currMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button className='' onClick={handleNextMonth}>
                    <Icon icon="f7:greaterthan" />
                </button>
            </div>
            <table className='min-w-full'>
                <thead>
                    <tr>
                        {days.map((day) => (
                            <th key={day} className={`px-2 py-2 ${day === 'Sat' || day === 'Sun' ? 'text-red-400' : 'text-teal-600'}`}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {daysInRows.map((row, idx) => (
                        <tr key={idx}>
                            {row.map((date) => (
                                <td key={date} className={`${date.getMonth() === currMonth.getMonth() ? '' : 'text-gray-500'} ${(date.getDay() === 0 || date.getDay() === 6) && (date.getMonth() === currMonth.getMonth()) ? 'text-red-400' : ''} ${isToday(date) ? 'text-white bg-teal-600 rounded-full' : ''}`}>
                                    {date.getDate()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;