import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface KeyboardKeyProps {
    position: [number, number, number];
    width: number;
    label: string;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ position, width, label }) => {
    const [pressed, setPressed] = useState(false);
    const [active, setActive] = useState(false);
    const meshRef = useRef<Mesh>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.scale.y = pressed ? 0.2 : 1;
        }
    });

    const handlePointerDown = () => {
        if (!active) {
            setPressed(true);
            simulateKeyPress(label);
            setActive(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setActive(false);
            }, 100);
        }
    };

    const handlePointerUp = () => {
        setPressed(false);
    };

    return (
        <group
            position={position}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOut={handlePointerUp}
        >
            <mesh ref={meshRef}>
                <boxGeometry args={[width, 0.1, 0.5]} />
                <meshStandardMaterial color="#555555" />
            </mesh>
            <Text
                position={[0, 0.06, 0.01]}
                rotation-x={-Math.PI / 2}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    );
};

const simulateKeyPress = (key: string) => {
    const event = new KeyboardEvent('keydown', {
        key,
        bubbles: true,
        cancelable: true,
    });
    document.dispatchEvent(event);

    const eventUp = new KeyboardEvent('keyup', {
        key,
        bubbles: true,
        cancelable: true,
    });
    setTimeout(() => document.dispatchEvent(eventUp), 100); // 100 мс для имитации нажатия
};


export default KeyboardKey;
