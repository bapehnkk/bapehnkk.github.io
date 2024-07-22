import React, {useState, useEffect, useRef} from 'react';
import Icon from '@/components/desktop/Icon';
import Taskbar from '@/components/desktop/Taskbar';
import StartMenu from '@/components/desktop/StartMenu';
import Window from '@/components/window/Window';
import BackgroundScene from '@/components/BackgroundScene/BackgroundScene';
import SleepScreen from '@/components/desktop/SleepScreen.tsx';
import LoginScreen from '@/components/desktop/LoginScreen';
import ProjectsWindow from '@/components/window/ProjectsWindow';
import AboutWindow from '@/components/window/AboutWindow';
import ContactWindow from '@/components/window/ContactWindow';
import styles from './Desktop.module.scss';
import projectIcon from '@/assets/images/project-icon.png';
import contactIcon from '@/assets/images/contact-icon.png';
import aboutIcon from '@/assets/images/about-icon.png';
import {FaFolder, FaEnvelope, FaUser} from 'react-icons/fa';

interface IconData {
    id: number;
    name: string;
    x: number;
    y: number;
    image: string;
}

interface WindowData {
    id: number;
    title: string;
    icon: React.ReactNode;
    zIndex: number;
    isActive: boolean;
    isMinimized: boolean;
    position: { x: number, y: number };
    size: { width: number, height: number };
    isMaximized: boolean;
    content: React.ReactNode;
}

interface PinnedWindowData {
    title: string;
    icon: React.ReactNode;
}

const Desktop: React.FC = () => {
    const [isStartMenuVisible, setStartMenuVisible] = useState(false);
    const [icons, setIcons] = useState<IconData[]>([
        {id: 1, name: 'Projects', x: 0, y: 0, image: projectIcon},
        {id: 2, name: 'About Me', x: 100, y: 0, image: aboutIcon},
        {id: 3, name: 'Contact', x: 200, y: 0, image: contactIcon},
    ]);
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [pinnedWindows, setPinnedWindows] = useState<PinnedWindowData[]>([]);
    const [sleepMode, setSleepMode] = useState(true);
    const [isLoginScreenVisible, setIsLoginScreenVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nextZIndex, setNextZIndex] = useState(1);
    const [nextWindowId, setNextWindowId] = useState(1); // Ensure unique IDs

    const startMenuRef = useRef<HTMLDivElement>(null);
    const startButtonRef = useRef<HTMLDivElement>(null);

    const GRID_SIZE = 100;
    const TASKBAR_HEIGHT = 5 * 16; // Taskbar height in pixels (5rem)

    const toggleStartMenu = () => {
        setStartMenuVisible(!isStartMenuVisible);
    };

    const openWindow = (title: string) => {
        let icon: React.ReactNode;
        let content: React.ReactNode;

        switch (title) {
            case 'Projects':
                icon = <FaFolder/>;
                content = <ProjectsWindow/>;
                break;
            case 'About Me':
                icon = <FaUser/>;
                content = <AboutWindow/>;
                break;
            case 'Contact':
                icon = <FaEnvelope/>;
                content = <ContactWindow/>;
                break;
            default:
                icon = <FaFolder/>;
                content = null;
        }

        const newWindow = {
            id: nextWindowId,
            title,
            icon,
            zIndex: nextZIndex,
            isActive: true,
            isMinimized: false,
            position: {x: 100, y: 100},
            size: {width: 320, height: 200},
            isMaximized: false,
            content
        };
        setNextWindowId(nextWindowId + 1); // Increment to ensure unique ID
        setNextZIndex(nextZIndex + 1);
        setWindows(windows.map(w => ({...w, isActive: false})).concat(newWindow));
    };

    const closeWindow = (id: number) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const minimizeWindow = (id: number) => {
        setWindows(windows.map(window =>
            window.id === id ? {...window, isMinimized: true, isActive: false} : window
        ));
    };

    const toggleWindow = (id: number) => {
        setWindows(windows.map(window => {
            if (window.id === id) {
                if (window.isMinimized || window.zIndex < nextZIndex - 1) {
                    return {...window, isMinimized: false, isActive: true, zIndex: nextZIndex};
                } else {
                    return {...window, isMinimized: true, isActive: false};
                }
            }
            return window;
        }));
        setNextZIndex(nextZIndex + 1);
    };

    const bringToFront = (id: number) => {
        setWindows(windows.map(window =>
            window.id === id ? {...window, zIndex: nextZIndex, isActive: true, isMinimized: false} : {
                ...window,
                isActive: false
            }
        ));
        setNextZIndex(nextZIndex + 1);
    };

    const updateWindowState = (id: number, position: { x: number, y: number }, size: {
        width: number,
        height: number
    }, isMaximized: boolean) => {
        setWindows(windows.map(window =>
            window.id === id ? {...window, position, size, isMaximized} : window
        ));
    };

    const snapToGrid = (x: number, y: number) => {
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
        return {x: snappedX, y: snappedY};
    };

    const moveIcon = (id: number, x: number, y: number) => {
        const {x: snappedX, y: snappedY} = snapToGrid(x, y);
        const clampedX = Math.max(0, Math.min(snappedX, window.innerWidth - GRID_SIZE));
        const clampedY = Math.max(0, Math.min(snappedY, window.innerHeight - TASKBAR_HEIGHT - GRID_SIZE));
        const updatedIcons = icons.map(icon =>
            icon.id === id ? {...icon, x: clampedX, y: clampedY} : icon
        );

        // Overlap check
        for (let i = 0; i < updatedIcons.length; i++) {
            for (let j = 0; j < updatedIcons.length; j++) {
                if (i !== j) {
                    const icon1 = updatedIcons[i];
                    const icon2 = updatedIcons[j];
                    if (icon1.x === icon2.x && icon1.y === icon2.y) {
                        return;
                    }
                }
            }
        }

        setIcons(updatedIcons);
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node) &&
            startButtonRef.current && !startButtonRef.current.contains(event.target as Node)) {
            setStartMenuVisible(false);
        }
    };

    const handleRestart = () => {
        window.location.reload();
    };

    const handleSleep = () => {
        setSleepMode(true);
    };

    const handleWakeUp = () => {
        setSleepMode(false);
        setIsLoginScreenVisible(true);
    };

    const handleShutDown = () => {
        if (window.confirm("Do you really want to close this page?")) {
            const newWindow = window.open('', '_self');
            if (newWindow) {
                newWindow.close();
            }
        }
    };

    const togglePin = (title: string, icon: React.ReactNode) => {
        setPinnedWindows((prev) =>
            prev.some(pinned => pinned.title === title)
                ? prev.filter(pinned => pinned.title !== title)
                : [...prev, {title, icon}]
        );
    };

    useEffect(() => {
        if (sleepMode) {
            setStartMenuVisible(false);
        }
    }, [sleepMode]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    if (sleepMode) {
        return (<SleepScreen onWakeUp={handleWakeUp}/>);
    }

    if (isLoginScreenVisible && !isLoggedIn) {
        return (<LoginScreen onLogin={() => {
            setIsLoggedIn(true);
            setIsLoginScreenVisible(false);
        }}/>);
    }

    const closeAllWindows = (title: string) => {
        setWindows(windows.filter(window => window.title !== title));
    };

    return (
        <div className={styles.desktop}>
            <BackgroundScene/>
            {icons.map(icon => (
                <Icon key={icon.id} {...icon} onDoubleClick={() => openWindow(icon.name)} onMove={moveIcon}/>
            ))}
            <Taskbar
                onClickStartButton={toggleStartMenu}
                windows={windows}
                pinnedWindows={pinnedWindows}
                onWindowClick={toggleWindow}
                onWindowClose={closeWindow}
                onWindowCloseAll={closeAllWindows}
                onPinToggle={togglePin}
                isStartMenuOpen={isStartMenuVisible}
                startButtonRef={startButtonRef}
                onOpenApplication={openWindow}
            />
            {isStartMenuVisible &&
                <div ref={startMenuRef}>
                    <StartMenu
                        onRestart={handleRestart}
                        onSleep={handleSleep}
                        onShutDown={handleShutDown}
                        onOpenApplication={openWindow}
                    />
                </div>}
            {windows.filter(window => !window.isMinimized).map(window => (
                <Window
                    key={window.id}
                    id={window.id}
                    title={window.title}
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    zIndex={window.zIndex}
                    onClick={bringToFront}
                    initialPosition={window.position}
                    initialSize={window.size}
                    initialMaximized={window.isMaximized}
                    onUpdate={updateWindowState}
                >
                    {window.content}
                </Window>
            ))}
        </div>
    );
};

export default Desktop;
