import React from 'react';

const Cup: React.FC = () => {
    return (
        <group>
            {/* Чашка */}
            <mesh position={[10, 0.5, 3]} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.5, 2.5, 32, 1, true]} />
                <meshStandardMaterial color="#FFFFFF" side={2} />
            </mesh>
            {/* Дно чашки */}
            <mesh position={[10, -0.75, 3]} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Ручка чашки */}
            <mesh position={[11.85, 0.5, 3]} castShadow receiveShadow>
                <torusGeometry args={[0.75, 0.15, 16, 100]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
        </group>
    );
};

export default Cup;
