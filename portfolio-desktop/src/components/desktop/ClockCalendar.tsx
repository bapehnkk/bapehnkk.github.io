import React, { useState, useEffect } from 'react';
import CustomCalendar from './CustomCalendar';
import styles from './ClockCalendar.module.scss';

interface ClockCalendarProps {
    calendarRef: React.RefObject<HTMLDivElement>;
}

const ClockCalendar: React.FC<ClockCalendarProps> = ({ calendarRef }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.clockCalendar} ref={calendarRef}>
            <div className={styles.time}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <CustomCalendar />
        </div>
    );
};

export default ClockCalendar;
