import React, { useState, useRef } from 'react';
import styles from '@/components/desktop/Icon.module.scss';

interface IconProps {
    id: number;
    name: string;
    x: number;
    y: number;
    image: string;
    onDoubleClick: () => void;
    onMove: (id: number, x: number, y: number) => void;
}

const Icon: React.FC<IconProps> = ({ id, name, x, y, image, onDoubleClick, onMove }) => {
    const iconRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [lastTap, setLastTap] = useState<number | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragging || !iconRef.current) return;
        const newX = e.clientX - iconRef.current.clientWidth / 2;
        const newY = e.clientY - iconRef.current.clientHeight / 2;
        onMove(id, newX, newY);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleTouchStart = () => {
        setDragging(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!dragging || !iconRef.current) return;
        const touch = e.touches[0];
        const newX = touch.clientX - iconRef.current.clientWidth / 2;
        const newY = touch.clientY - iconRef.current.clientHeight / 2;
        onMove(id, newX, newY);
    };

    const handleTouchEnd = () => {
        setDragging(false);
        const now = Date.now();
        if (lastTap && (now - lastTap) < 300) {
            onDoubleClick();
        } else {
            setLastTap(now);
        }
    };

    React.useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dragging]);

    return (
        <div
            ref={iconRef}
            className={styles.icon}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                position: 'absolute',
                cursor: dragging ? 'grabbing' : 'pointer',
            }}
            onDoubleClick={onDoubleClick}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <img src={image} alt={name} className={styles['icon-image']} />
            <div className={styles['icon-name']}>{name}</div>
        </div>
    );
};

export default Icon;
