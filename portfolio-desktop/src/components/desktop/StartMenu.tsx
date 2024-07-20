import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaInfoCircle, FaBriefcase, FaEnvelope, FaRedo, FaMoon, FaPowerOff } from 'react-icons/fa';
import styles from './StartMenu.module.scss';

interface StartMenuProps {
    onRestart: () => void;
    onSleep: () => void;
    onShutDown: () => void;
    onOpenApplication: (appName: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onRestart, onSleep, onShutDown, onOpenApplication }) => {
    const menuVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: '0%' },
    };

    return (
        <>
            <motion.div
                className={styles.startMenu}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={menuVariants}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.menuSection}>
                    <div className={styles.userInfo}>
                        <FaUserCircle className={styles.userAvatar} />
                        <div className={styles.userName}>User Name</div>
                    </div>
                </div>
                <ul className={styles.menuItems}>
                    <li className={styles.menuItem} onClick={() => onOpenApplication('About Me')}>
                        <FaInfoCircle className={styles.menuItemIcon} />
                        About Me
                    </li>
                    <li className={styles.menuItem} onClick={() => onOpenApplication('Projects')}>
                        <FaBriefcase className={styles.menuItemIcon} />
                        Projects
                    </li>
                    <li className={styles.menuItem} onClick={() => onOpenApplication('Contact')}>
                        <FaEnvelope className={styles.menuItemIcon} />
                        Contact
                    </li>
                </ul>
                <div className={styles.powerOptions}>
                    <div className={styles.powerOption} onClick={onRestart}>
                        <FaRedo className={styles.powerOptionIcon} />
                        Restart
                    </div>
                    <div className={styles.powerOption} onClick={onSleep}>
                        <FaMoon className={styles.powerOptionIcon} />
                        Sleep
                    </div>
                    <div className={styles.powerOption} onClick={onShutDown}>
                        <FaPowerOff className={styles.powerOptionIcon} />
                        Shut Down
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default StartMenu;
