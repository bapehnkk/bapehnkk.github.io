import React, { useState } from 'react';
import styles from './CustomCalendar.module.scss';

const CustomCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(month, year);
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const calendarDays = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className={styles.empty}></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push(
                <div key={day} className={styles.day}>
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={handlePrevMonth}>&lt;</button>
                <span>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className={styles.daysOfWeek}>
                {daysOfWeek.map(day => (
                    <div key={day} className={styles.dayOfWeek}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.days}>
                {generateCalendar()}
            </div>
        </div>
    );
};

export default CustomCalendar;
