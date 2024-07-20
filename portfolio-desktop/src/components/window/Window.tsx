import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import WindowHeader from './WindowHeader';
import styles from './Window.module.scss';

interface WindowProps {
    id: number;
    title: string;
    zIndex: number;
    onClose: (id: number) => void;
    onMinimize: (id: number) => void;
    onClick: (id: number) => void;
    initialPosition: { x: number; y: number };
    initialSize: { width: number; height: number };
    initialMaximized: boolean;
    onUpdate: (
        id: number,
        position: { x: number; y: number },
        size: { width: number; height: number },
        isMaximized: boolean
    ) => void;
    children?: ReactNode;
}

const Window: React.FC<WindowProps> = ({
                                           id,
                                           title,
                                           zIndex,
                                           onClose,
                                           onMinimize,
                                           onClick,
                                           initialPosition,
                                           initialSize,
                                           initialMaximized,
                                           onUpdate,
                                           children,
                                       }) => {
    const [isMaximized, setIsMaximized] = useState(initialMaximized);
    const [size, setSize] = useState(initialSize);
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragStartPosition = useRef({ x: 0, y: 0 });
    const dragStartMousePosition = useRef({ x: 0, y: 0 });
    const resizeDirection = useRef<string | null>(null);
    const animationFrame = useRef<number | null>(null);
    const prevSize = useRef({ width: initialSize.width, height: initialSize.height });
    const prevPosition = useRef({ x: initialPosition.x, y: initialPosition.y });
    const headerHeight = 40; // Assuming the height of the WindowHeader is 40px

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }

        setIsDragging(true);
        dragStartMousePosition.current = { x: e.clientX, y: e.clientY };
        dragStartPosition.current = { ...position };

        if (isMaximized) {
            handleRestore();
        } else {
            onClick(id); // Bring window to front
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }

        const touch = e.touches[0];
        setIsDragging(true);
        dragStartMousePosition.current = { x: touch.clientX, y: touch.clientY };
        dragStartPosition.current = { ...position };

        if (isMaximized) {
            handleRestore();
        } else {
            onClick(id); // Bring window to front
        }
    };

    const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
        setIsResizing(true);
        resizeDirection.current = direction;
        dragStartMousePosition.current = { x: e.clientX, y: e.clientY };
        dragStartPosition.current = { ...size, ...position };
        e.stopPropagation(); // Prevent triggering the drag handler
    };

    const handleResizeTouchStart = (e: React.TouchEvent, direction: string) => {
        setIsResizing(true);
        resizeDirection.current = direction;
        const touch = e.touches[0];
        dragStartMousePosition.current = { x: touch.clientX, y: touch.clientY };
        dragStartPosition.current = { ...size, ...position };
        e.stopPropagation(); // Prevent triggering the drag handler
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (animationFrame.current !== null) {
            return;
        }
        animationFrame.current = requestAnimationFrame(() => {
            if (isDragging) {
                updatePosition(e.clientX, e.clientY);
            } else if (isResizing) {
                updateSizeAndPosition(e.clientX, e.clientY);
            }
            if (isDragging && e.clientY <= headerHeight / 2 && !isMaximized) {
                handleMaximize();
            }
            animationFrame.current = null;
        });
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (animationFrame.current !== null) {
            return;
        }
        animationFrame.current = requestAnimationFrame(() => {
            const touch = e.touches[0];
            if (isDragging) {
                updatePosition(touch.clientX, touch.clientY);
            } else if (isResizing) {
                updateSizeAndPosition(touch.clientX, touch.clientY);
            }
            if (isDragging && touch.clientY <= headerHeight / 2 && !isMaximized) {
                handleMaximize();
            }
            animationFrame.current = null;
        });
    };

    const updatePosition = (clientX: number, clientY: number) => {
        const deltaX = clientX - dragStartMousePosition.current.x;
        const deltaY = clientY - dragStartMousePosition.current.y;
        const newX = dragStartPosition.current.x + deltaX;
        const newY = dragStartPosition.current.y + deltaY;

        // Clamp the new position within the screen bounds
        const clampedX = Math.max(-size.width + 50, Math.min(newX, window.innerWidth - 50));
        const clampedY = Math.max(-size.height + 50, Math.min(newY, window.innerHeight - 50));

        setPosition({ x: clampedX, y: clampedY });
        onUpdate(id, { x: clampedX, y: clampedY }, size, isMaximized);
    };

    const updateSizeAndPosition = (clientX: number, clientY: number) => {
        const deltaX = clientX - dragStartMousePosition.current.x;
        const deltaY = clientY - dragStartMousePosition.current.y;
        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        switch (resizeDirection.current) {
            case 'right':
                newWidth += deltaX;
                break;
            case 'bottom':
                newHeight += deltaY;
                break;
            case 'bottom-right':
                newWidth += deltaX;
                newHeight += deltaY;
                break;
            case 'left':
                newWidth -= deltaX;
                newX += deltaX;
                break;
            case 'top':
                newHeight -= deltaY;
                newY += deltaY;
                break;
            case 'top-left':
                newWidth -= deltaX;
                newHeight -= deltaY;
                newX += deltaX;
                newY += deltaY;
                break;
            case 'top-right':
                newWidth += deltaX;
                newHeight -= deltaY;
                newY += deltaY;
                break;
            case 'bottom-left':
                newWidth -= deltaX;
                newHeight += deltaY;
                newX += deltaX;
                break;
        }

        // Ensure the window remains within the screen bounds
        const clampedWidth = Math.max(200, Math.min(newWidth, window.innerWidth - newX));
        const clampedHeight = Math.max(150, Math.min(newHeight, window.innerHeight - newY));

        setSize({ width: clampedWidth, height: clampedHeight });
        setPosition({ x: newX, y: newY });
        onUpdate(id, { x: newX, y: newY }, { width: clampedWidth, height: clampedHeight }, isMaximized);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        if (animationFrame.current !== null) {
            cancelAnimationFrame(animationFrame.current);
            animationFrame.current = null;
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setIsResizing(false);
        if (animationFrame.current !== null) {
            cancelAnimationFrame(animationFrame.current);
            animationFrame.current = null;
        }
    };

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent) => handleMouseMove(e);
        const mouseUpHandler = handleMouseUp;
        const touchMoveHandler = (e: TouchEvent) => handleTouchMove(e);
        const touchEndHandler = handleTouchEnd;

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        window.addEventListener('touchmove', touchMoveHandler);
        window.addEventListener('touchend', touchEndHandler);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            window.removeEventListener('touchmove', touchMoveHandler);
            window.removeEventListener('touchend', touchEndHandler);
        };
    }, [isDragging, isResizing]);

    const handleMaximize = () => {
        if (!isMaximized) {
            prevSize.current = size;
            prevPosition.current = position;
            setIsMaximized(true);
            onUpdate(id, { x: 0, y: 0 }, { width: window.innerWidth, height: window.innerHeight }, true);
        }
    };

    const handleRestore = () => {
        setIsMaximized(false);
        setSize(prevSize.current);
        setPosition(prevPosition.current);
        onUpdate(id, prevPosition.current, prevSize.current, false);
    };

    const handleClose = () => {
        onClose(id);
    };

    const handleMinimize = () => {
        onMinimize(id);
    };

    const handleDoubleClickHeader = () => {
        if (isMaximized) {
            handleRestore();
        } else {
            handleMaximize();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`${styles.window} ${isMaximized ? styles.maximized : ''}`}
            style={{
                zIndex,
                width: isMaximized ? '100%' : size.width,
                height: isMaximized ? '100%' : size.height,
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
            }}
            onMouseDown={() => onClick(id)}
            onTouchStart={() => onClick(id)}
        >
            <div
                className={styles['window-header']}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onDoubleClick={handleDoubleClickHeader}
            >
                <WindowHeader
                    title={title}
                    onClose={handleClose}
                    onMaximize={handleMaximize}
                    onMinimize={handleMinimize}
                    isMaximized={isMaximized}
                />
            </div>
            <div className={styles['window-content']}>
                {children}
            </div>
            <div
                className={`${styles.resizeHandle} ${styles.resizeRight}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'right')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeBottom}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'bottom')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeBottomRight}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'bottom-right')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeLeft}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'left')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeTop}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'top')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeTopLeft}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'top-left')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeTopRight}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'top-right')}
            />
            <div
                className={`${styles.resizeHandle} ${styles.resizeBottomLeft}`}
                onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'bottom-left')}
            />
        </motion.div>
    );
};

export default Window;
