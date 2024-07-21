import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';
import styles from './SleepScreen.module.scss';
import windowsLockScreen1 from '@/assets/images/windows-lock-screen_1.png';
import windowsLockScreen2 from '@/assets/images/windows-lock-screen_2.jpg';
import windowsLockScreen3 from '@/assets/images/windows-lock-screen_3.jpg';

interface SleepScreenProps {
    onWakeUp: () => void;
}

const SleepScreen: React.FC<SleepScreenProps> = ({ onWakeUp }) => {
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const controls = useAnimation();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [startY, setStartY] = useState<number | null>(null);
    const [currentY, setCurrentY] = useState<number>(0);
    const isMounted = useRef(false);

    useEffect(() => {
        const images = [windowsLockScreen1, windowsLockScreen2, windowsLockScreen3];
        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBackgroundImage(randomImage);
    }, []);

    useEffect(() => {
        isMounted.current = true;

        const startBouncing = () => {
            if (isMounted.current) {
                controls.start({
                    y: [0, -30, 0],
                    transition: { duration: 0.5, ease: 'easeInOut' },
                });
            }
        };

        const initialDelay = Math.random() * 3000;
        const bounceTimeout = setTimeout(() => {
            startBouncing();
            const interval = setInterval(startBouncing, Math.random() * (7000 - 3000) + 5000);
            return () => clearInterval(interval); // Clean up interval on unmount
        }, initialDelay);

        return () => {
            isMounted.current = false;
            clearTimeout(bounceTimeout); // Clean up timeout on unmount
        };
    }, [controls]);

    const handleDragStart = (_: MouseEvent | TouchEvent | PointerEvent, info: { point: { y: number } }) => {
        setStartY(info.point.y);
    };

    const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { point: { y: number } }) => {
        setCurrentY(info.point.y);
    };

    const handleDragEnd = () => {
        if (startY !== null && currentY < startY - 100) {
            onWakeUp();
        }
        setStartY(null);
        setCurrentY(0);
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.sleepScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className={`${styles.lockScreen} ${isActive ? styles.lockScreenActive : ''}`}
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.75}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => setIsActive(false)}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className={styles.arrowWrapper}>
                        <motion.div className={styles.arrow} animate={controls}>
                            <FaChevronUp />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SleepScreen;
