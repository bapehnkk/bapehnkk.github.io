import React from 'react';
import { Edges } from '@react-three/drei';
import KeyboardKey from './KeyboardKey';
import keys from './keys';

const Laptop: React.FC = () => {
    return (
        <group>
            {/* Screen */}
            <mesh position={[0, 3.5, -1.5]} castShadow receiveShadow>
                <boxGeometry args={[12, 8, 0.2]} />
                <meshStandardMaterial color="#565656" />
                <Edges>
                    <lineBasicMaterial color="#000" />
                </Edges>
            </mesh>
            {/* Screen Frame */}
            <mesh position={[0, 3.5, -1.501]} castShadow receiveShadow>
                <boxGeometry args={[12.2, 8.2, 0.2]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            {/* Base */}
            <mesh position={[0, -0.6, 2.5]}>
                <boxGeometry args={[12, 0.5, 8]} />
                <meshStandardMaterial color="#333333" />
                <Edges>
                    <lineBasicMaterial color="#000" />
                </Edges>
            </mesh>
            {/* Keyboard */}
            {keys.map((key, index) => (
                <KeyboardKey
                    key={index}
                    position={[key.x, -0.35, key.y]}
                    width={key.width}
                    label={key.label}
                />
            ))}
            {/* Touchpad */}
            <mesh position={[0, -0.35, 5.25]}>
                <boxGeometry args={[3, 0.1, 2]} />
                <meshStandardMaterial color="#777777" />
            </mesh>
        </group>
    );
};

export default Laptop;
