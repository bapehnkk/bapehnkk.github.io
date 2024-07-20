import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBell, FaExclamationTriangle, FaWindows } from 'react-icons/fa';
import styles from './Taskbar.module.scss';
import windowsIcon from '@/assets/images/windows-icon.png';
import StartMenu from './StartMenu';
import Weather from './Weather';
import ClockCalendar from './ClockCalendar';

interface TaskbarProps {
    onClickStartButton: () => void;
    windows: { id: number, title: string, icon: React.ReactNode, isMinimized: boolean, zIndex: number }[];
    onWindowClick: (id: number) => void;
    onWindowClose: (id: number) => void;
    isStartMenuOpen: boolean;
    startButtonRef: React.RefObject<HTMLDivElement>;
    onOpenApplication: (appName: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
                                             onClickStartButton,
                                             windows = [],
                                             onWindowClick,
                                             onWindowClose,
                                             isStartMenuOpen,
                                             startButtonRef,
                                             onOpenApplication,
                                         }) => {
    const [time, setTime] = useState(new Date());
    const [isClockCalendarOpen, setIsClockCalendarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const clockCalendarRef = useRef<HTMLDivElement>(null);
    const clockButtonRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const windowsContainerRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleStartButtonClick = () => {
        onClickStartButton();
    };

    const handleClockClick = () => {
        setIsClockCalendarOpen(!isClockCalendarOpen);
    };

    const handleBellClick = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            clockCalendarRef.current &&
            !clockCalendarRef.current.contains(event.target as Node) &&
            clockButtonRef.current &&
            !clockButtonRef.current.contains(event.target as Node)
        ) {
            setIsClockCalendarOpen(false);
        }

        if (
            notificationsRef.current &&
            !notificationsRef.current.contains(event.target as Node)
        ) {
            setIsNotificationsOpen(false);
        }
    };

    const handleWindowMouseDown = (event: React.MouseEvent, id: number) => {
        if (event.button === 1) { // Middle mouse button
            onWindowClose(id);
        } else {
            onWindowClick(id);
        }
    };

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
        isDragging.current = true;
        startX.current = event.pageX - (windowsContainerRef.current?.offsetLeft || 0);
        scrollLeft.current = windowsContainerRef.current?.scrollLeft || 0;
    };

    const handleDragMove = (event: MouseEvent) => {
        if (!isDragging.current) return;
        const x = event.pageX - (windowsContainerRef.current?.offsetLeft || 0);
        const walk = (x - startX.current) * 2; // Scroll-fast
        if (windowsContainerRef.current) {
            windowsContainerRef.current.scrollLeft = scrollLeft.current - walk;
        }
    };

    const handleDragEnd = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, []);

    const highestZIndex = Math.max(...windows.map(window => window.zIndex));

    return (
        <>
            <div className={styles.taskbar}>
                <div className={styles.startButton} onClick={handleStartButtonClick} ref={startButtonRef}>
                    <img src={windowsIcon} alt="Start" className={styles.windowsIcon} />
                </div>
                <div
                    className={styles.windowsContainer}
                    ref={windowsContainerRef}
                    onMouseDown={handleDragStart}
                >
                    <div className={styles.windows}>
                        {windows.map((window) => (
                            <div
                                key={window.id}
                                className={`${styles.taskbarIcon} ${window.zIndex === highestZIndex ? styles.activeWindow : ''}`}
                                onMouseDown={(event) => handleWindowMouseDown(event, window.id)}
                            >
                                <div className={styles.windowIcon}>{window.icon}</div>
                                {window.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.taskbarRight}>
                    <Weather />
                    <FaBell className={styles.notificationIcon} onClick={handleBellClick} />
                    <div className={styles.clock} onClick={handleClockClick} ref={clockButtonRef}>
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isStartMenuOpen && (
                    <>
                        <div className={styles.overlay} onClick={handleStartButtonClick}></div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <StartMenu
                                onRestart={() => console.log('Restart')}
                                onSleep={() => console.log('Sleep')}
                                onShutDown={() => console.log('Shut Down')}
                                onOpenApplication={onOpenApplication}  // Add this line
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isClockCalendarOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ClockCalendar calendarRef={clockCalendarRef} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isNotificationsOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={styles.notifications}
                        ref={notificationsRef}
                    >
                        <div className={styles.notification}>
                            <FaWindows className={styles.notificationIcon} />
                            <div>
                                <strong>System Notification</strong>
                                <p>Update your Windows...</p>
                            </div>
                        </div>
                        <div className={styles.notification}>
                            <FaExclamationTriangle className={styles.notificationIcon} />
                            <div>
                                <strong>Warning</strong>
                                <p>You've been hacked, pay to this account...</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Taskbar;
