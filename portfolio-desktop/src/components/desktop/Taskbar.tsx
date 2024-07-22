import React, {useState, useEffect, useRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaBell, FaExclamationTriangle, FaThumbtack, FaTimes, FaWindows} from 'react-icons/fa';
import styles from './Taskbar.module.scss';
import windowsIcon from '@/assets/images/windows-icon.png';
import StartMenu from './StartMenu';
import Weather from './Weather';
import ClockCalendar from './ClockCalendar';

interface Window {
    id: number;
    title: string;
    icon: React.ReactNode;
    isMinimized: boolean;
    zIndex: number;
}

interface ContextMenu {
    id: number;
    x: number;
    y: number;
}

interface TaskbarProps {
    onClickStartButton: () => void;
    onWindowClick: (id: number) => void;
    onWindowClose: (id: number) => void;
    onWindowCloseAll: (title: string) => void;
    onPinToggle: (title: string, icon: React.ReactNode) => void;
    isStartMenuOpen: boolean;
    startButtonRef: React.RefObject<HTMLDivElement>;
    onOpenApplication: (appName: string) => void;
    windows: Window[];
    pinnedWindows: { title: string, icon: React.ReactNode }[];
}

const Taskbar: React.FC<TaskbarProps> = ({
                                             onClickStartButton,
                                             windows = [],
                                             pinnedWindows = [],
                                             onWindowClick,
                                             onWindowClose,
                                             isStartMenuOpen,
                                             startButtonRef,
                                             onOpenApplication,
                                             onWindowCloseAll,
                                             onPinToggle
                                         }) => {
    const [time, setTime] = useState(new Date());
    const [isClockCalendarOpen, setIsClockCalendarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
    const [, setVisiblePinned] = useState<{ title: string, icon: React.ReactNode }[]>(pinnedWindows);

    const clockCalendarRef = useRef<HTMLDivElement>(null);
    const clockButtonRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const windowsContainerRef = useRef<HTMLDivElement>(null);

    const isDragging = useRef(false);
    const startX = useRef(0);
    const startY = useRef(0);
    const scrollLeft = useRef(0);
    const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setVisiblePinned(pinnedWindows.filter(pinned => !windows.some(win => win.title === pinned.title)));
    }, [pinnedWindows, windows]);

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
        if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(event.target as Node) &&
            windowsContainerRef.current &&
            !windowsContainerRef.current.contains(event.target as Node)
        ) {
            setContextMenu(null);
        }
    };

    const handleWindowMouseDown = (
        event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
        id: number,
        title: string
    ) => {
        const windowExists = windows.some(win => win.id === id);

        const handleTouchEnd = (touchEvent: TouchEvent) => {
            touchEvent.preventDefault();
            const touch = touchEvent.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
            const contextMenuOpen = Math.abs(startX.current - endX) < 10 && Math.abs(startY.current - endY) < 10;

            if (windowExists) {
                if (contextMenuOpen) {
                    setContextMenu({id, x: endX, y: endY});
                } else {
                    onWindowClick(id);
                }
            } else {
                onOpenApplication(title);
            }

            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchmove', handleTouchMove);
        };

        const handleTouchMove = (touchMoveEvent: TouchEvent) => {
            touchMoveEvent.preventDefault();
            const touch = touchMoveEvent.touches[0];
            const moveX = touch.clientX;
            const moveY = touch.clientY;

            if (Math.abs(startX.current - moveX) > 10 || Math.abs(startY.current - moveY) > 10) {
                isDragging.current = true;
            }
        };

        if (windowExists) {
            if (event.type === 'mousedown') {
                if ((event as React.MouseEvent).button === 1) {
                    onWindowClose(id);
                } else if ((event as React.MouseEvent).button === 2) {
                    event.preventDefault();
                    setContextMenu({
                        id,
                        x: (event as React.MouseEvent).clientX,
                        y: (event as React.MouseEvent).clientY
                    });
                } else {
                    onWindowClick(id);
                }
            } else if (event.type === 'touchstart') {
                startX.current = (event as React.TouchEvent).touches[0].clientX;
                startY.current = (event as React.TouchEvent).touches[0].clientY;
                isDragging.current = false;

                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchmove', handleTouchMove);
            }
        } else {
            onOpenApplication(title);
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

    useEffect(() => {
        if (contextMenu && contextMenuRef.current) {
            const menuHeight = contextMenuRef.current.clientHeight;
            const menuWidth = contextMenuRef.current.clientWidth;
            const windowIcon = document.getElementById(`window-icon-${contextMenu.id}`);
            if (windowIcon) {
                const rect = windowIcon.getBoundingClientRect();
                const offset = 15; // Offset
                let left = rect.left + rect.width / 2 - menuWidth / 2;
                const top = rect.top - menuHeight - offset;

                // Ensure the menu does not overflow the screen horizontally
                if (left + menuWidth > window.innerWidth) {
                    left = window.innerWidth - menuWidth;
                } else if (left < 0) {
                    left = 0;
                }

                setMenuPosition({
                    top,
                    left,
                });
            }
        }
    }, [contextMenu]);

    const groupedWindows = windows.reduce((acc: { [key: string]: Window[] }, window) => {
        if (!acc[window.title]) {
            acc[window.title] = [];
        }
        acc[window.title].push(window);
        return acc;
    }, {});

    const handleCloseAllWindows = (title: string) => {
        onWindowCloseAll(title);
        setContextMenu(null);
    };

    const handleToggleWindowMinimize = (id: number) => {
        onWindowClick(id);
        setContextMenu(null);
    };

    const getGroupTitleById = (id: number): string => {
        const window = windows.find(window => window.id === id);
        return window ? window.title : '';
    };

    const currentGroupTitle = getGroupTitleById(contextMenu?.id || 0);
    const currentGroupIcon = windows.find(window => window.title === currentGroupTitle)?.icon;
    const isGroupMultiple = groupedWindows[currentGroupTitle]?.length > 1;
    const isPinned = pinnedWindows.some(pinned => pinned.title === currentGroupTitle);

    return (
        <>
            <div className={styles.taskbar}>
                <div className={styles.startButton} onClick={handleStartButtonClick} ref={startButtonRef}>
                    <img src={windowsIcon} alt="Start" className={styles.windowsIcon}/>
                </div>
                <div
                    className={styles.windowsContainer}
                    ref={windowsContainerRef}
                    onMouseDown={handleDragStart}
                >
                    <div className={styles.windows}>
                        {/* Render pinned and grouped windows with pinned titles first */}
                        {pinnedWindows.map((pinned) => {
                            const group = groupedWindows[pinned.title];
                            if (group) {
                                return (
                                    <div
                                        key={group[0].id}
                                        id={`window-icon-${group[0].id}`}
                                        className={`${styles.taskbarIcon} ${group.length > 1 ? styles.grouped : ''} ${group.some(win => win.zIndex === Math.max(...windows.map(win => win.zIndex))) ? styles.activeWindow : ''}`}
                                        onMouseDown={(event) => handleWindowMouseDown(event, group[0].id, group[0].title)}
                                        onTouchStart={(event) => handleWindowMouseDown(event, group[0].id, group[0].title)}
                                        onContextMenu={(event) => event.preventDefault()}
                                    >
                                        <div className={styles.windowIcon}>{group[0].icon}</div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        key={`pinned-${pinned.title}`}
                                        id={`window-icon-pinned-${pinned.title}`}
                                        className={`${styles.taskbarIcon} ${styles.taskbarIconPinned}`}
                                        onMouseDown={(event) => handleWindowMouseDown(event, 0, pinned.title)}
                                        onTouchStart={(event) => handleWindowMouseDown(event, 0, pinned.title)}
                                        onContextMenu={(event) => event.preventDefault()}
                                    >
                                        <div className={styles.windowIcon}>{pinned.icon}</div>
                                    </div>
                                );
                            }
                        })}
                        {/* Render grouped windows without pinned titles next */}
                        {Object.entries(groupedWindows).filter(([title]) => !pinnedWindows.some(pinned => pinned.title === title)).map(([, group]) => (
                            <div
                                key={group[0].id}
                                id={`window-icon-${group[0].id}`}
                                className={`${styles.taskbarIcon} ${group.length > 1 ? styles.grouped : ''} ${group.some(win => win.zIndex === Math.max(...windows.map(win => win.zIndex))) ? styles.activeWindow : ''}`}
                                onMouseDown={(event) => handleWindowMouseDown(event, group[0].id, group[0].title)}
                                onTouchStart={(event) => handleWindowMouseDown(event, group[0].id, group[0].title)}
                                onContextMenu={(event) => event.preventDefault()}
                            >
                                <div className={styles.windowIcon}>{group[0].icon}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.taskbarRight}>
                    <Weather/>
                    <FaBell className={styles.notificationIcon} onClick={handleBellClick}/>
                    <div className={styles.clock} onClick={handleClockClick} ref={clockButtonRef}>
                        {time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isStartMenuOpen && (
                    <>
                        <div className={styles.overlay} onClick={handleStartButtonClick}></div>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            <StartMenu
                                onRestart={() => console.log('Restart')}
                                onSleep={() => console.log('Sleep')}
                                onShutDown={() => console.log('Shut Down')}
                                onOpenApplication={onOpenApplication}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isClockCalendarOpen && (
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        transition={{duration: 0.3}}
                    >
                        <ClockCalendar calendarRef={clockCalendarRef}/>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isNotificationsOpen && (
                    <motion.div
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -10}}
                        transition={{duration: 0.3}}
                        className={styles.notifications}
                        ref={notificationsRef}
                    >
                        <div className={styles.notification}>
                            <FaWindows className={styles.notificationIcon}/>
                            <div>
                                <strong>System Notification</strong>
                                <p>Update your Windows...</p>
                            </div>
                        </div>
                        <div className={styles.notification}>
                            <FaExclamationTriangle className={styles.notificationIcon}/>
                            <div>
                                <strong>Warning</strong>
                                <p>You've been hacked, pay to this account...</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        className={styles.contextMenu}
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{duration: 0.2}}
                        style={{top: menuPosition.top, left: menuPosition.left}}
                        ref={contextMenuRef}
                    >
                        {groupedWindows[currentGroupTitle]?.map((win) => (
                            <div
                                key={win.id}
                                className={styles.contextMenuItem}
                                onClick={() => handleToggleWindowMinimize(win.id)}
                            >
                                <span className={styles.contextMenuIcon}>{win.icon}</span>
                                {win.title}
                            </div>
                        ))}
                        <div className={styles.contextMenuDivide}></div>
                        <div className={styles.contextMenuItem} onClick={() => {
                            setContextMenu(null);
                            onOpenApplication(currentGroupTitle);
                        }}>
                            {currentGroupIcon && <span className={styles.contextMenuIcon}>{currentGroupIcon}</span>}
                            <strong>{currentGroupTitle}</strong>
                        </div>
                        <div
                            className={styles.contextMenuItem}
                            onClick={() => {
                                onPinToggle(currentGroupTitle, currentGroupIcon);
                                setContextMenu(null);
                            }}
                        >
                            <FaThumbtack className={styles.contextMenuIcon}/>
                            {isPinned ? 'Unpin from taskbar' : 'Pin to taskbar'}
                        </div>
                        {isGroupMultiple ? (
                            <div
                                className={styles.contextMenuItem}
                                onClick={() => handleCloseAllWindows(currentGroupTitle)}
                            >
                                <FaTimes className={styles.contextMenuIcon}/>
                                Close all tabs
                            </div>
                        ) : (
                            <div
                                className={styles.contextMenuItem}
                                onClick={() => {
                                    onWindowClose(contextMenu.id);
                                    setContextMenu(null);
                                }}
                            >
                                <FaTimes className={styles.contextMenuIcon}/>
                                Close window
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Taskbar;
