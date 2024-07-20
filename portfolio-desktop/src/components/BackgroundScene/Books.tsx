import React from 'react';

const Books: React.FC = () => {

    return (
        <group position={[-8, -0.25, 0]}>
            {/* Книга 1 */}
            <group position={[0, -0.5, 0]}>
                <mesh position={[0, 0.5, 1.5]} castShadow receiveShadow>
                    <boxGeometry args={[3, 1, 6]} />
                    <meshStandardMaterial color="#0000FF" />
                </mesh>
                <mesh position={[0, 0.5, 1.5]} castShadow receiveShadow>
                    <boxGeometry args={[3.05, 1.05, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>
            </group>
            {/* Книга 2 */}
            <group position={[0, 0.5, 0]}>
                <mesh position={[0, 0.5, 1.25]} castShadow receiveShadow>
                    <boxGeometry args={[3, 1, 5]} />
                    <meshStandardMaterial color="#FF0000" />
                </mesh>
                <mesh position={[0, 0.5, 1.25]} castShadow receiveShadow>
                    <boxGeometry args={[3.05, 1.05, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>
            </group>
            {/* Книга 3 */}
            <group position={[0, 1.5, 0]}>
                <mesh position={[0, 0.5, 1]} castShadow receiveShadow>
                    <boxGeometry args={[3, 1, 4]} />
                    <meshStandardMaterial color="#00FF00" />
                </mesh>
                <mesh position={[0, 0.5, 1]} castShadow receiveShadow>
                    <boxGeometry args={[3.05, 1.05, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>
            </group>
        </group>
    );
};

export default Books;
