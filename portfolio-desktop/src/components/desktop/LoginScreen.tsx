import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import styles from './LoginScreen.module.scss';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = () => {
        setIsLoggingIn(true);
        setTimeout(() => {
            onLogin();
        }, 1000); // Ensure the loader spins for at least a second
    };

    return (
        <AnimatePresence>
            <motion.div
                className={styles.loginScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className={styles.loginContainer}>
                    <FaUserCircle className={styles.avatar} />
                    <h2 className={styles.username}>User Name</h2>
                    {!isLoggingIn ? (
                        <motion.button
                            className={styles.loginButton}
                            onClick={handleLogin}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Login
                        </motion.button>
                    ) : (
                        <motion.div
                            className={styles.loaderContainer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className={styles.loader}></div>
                            <span className={styles.welcomeText}>Welcome</span>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginScreen;
