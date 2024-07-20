import React from 'react';
import { FaTimes, FaMinus, FaExpand, FaCompress } from 'react-icons/fa';
import styles from './WindowHeader.module.scss';

interface WindowHeaderProps {
    title: string;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    isMaximized?: boolean;
    onDoubleClickHeader?: () => void;
}

const WindowHeader: React.FC<WindowHeaderProps> = ({
                                                       title,
                                                       onClose,
                                                       onMinimize,
                                                       onMaximize,
                                                       isMaximized = false,
                                                       onDoubleClickHeader
                                                   }) => {
    return (
        <div className={styles.header} onDoubleClick={onDoubleClickHeader}>
            <div className={styles.title}>{title}</div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={onMinimize}>
                    <FaMinus />
                </button>
                <button className={styles.button} onClick={onMaximize}>
                    {isMaximized ? <FaCompress /> : <FaExpand />}
                </button>
                <button className={styles.button} onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default WindowHeader;
