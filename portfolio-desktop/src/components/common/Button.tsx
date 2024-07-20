import React from 'react';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded">
            {children}
        </button>
    );
};

export default Button;
