import React, { useState } from 'react';
import { RoundedBox, Text } from '@react-three/drei';

interface CodeLineProps {
    position: [number, number, number];
    width: number;
    color: string;
    text: string;
}

const CodeLine: React.FC<CodeLineProps> = ({ position, width, color, text }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <RoundedBox
                args={[width, 0.2, 0.1]}
                radius={0.05}
                smoothness={4}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                visible={!hovered}
            >
                <meshStandardMaterial color={color} />
            </RoundedBox>
            {hovered && (
                <Text
                    position={[-width / 2 + 0.1, 0.1, 0.1]}
                    fontSize={0.2}
                    color={color}
                    anchorX="left"
                    anchorY="middle"
                >
                    {text}
                </Text>
            )}
        </group>
    );
};

export default CodeLine;
