import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Laptop from './Laptop';
import CodeLine from './CodeLine';
import Books from './Books';
import Cup from './Cup';
import Terminal from './Terminal';

const codeLines = [
    {width: 4.0, color: '#569cd6', indent: 0, text: 'using System;'},
    {width: 6.0, color: '#569cd6', indent: 0, text: 'namespace HelloWorld'},
    {width: 1.0, color: '#dcdcaa', indent: 0, text: '{'},
    {width: 5.0, color: '#569cd6', indent: 1, text: 'class Program'},
    {width: 1.0, color: '#dcdcaa', indent: 1, text: '{'},
    {width: 8.0, color: '#569cd6', indent: 2, text: 'static void Main(string[] args)'},
    {width: 1.0, color: '#dcdcaa', indent: 2, text: '{'},
    {width: 9.5, color: '#4ec9b0', indent: 3, text: 'Console.WriteLine("Hello, World!");'},
    {width: 1.0, color: '#dcdcaa', indent: 2, text: '}'},
    {width: 1.0, color: '#dcdcaa', indent: 1, text: '}'},
    {width: 1.0, color: '#dcdcaa', indent: 0, text: '}'},
];

const BackgroundScene: React.FC = () => {
    const [text, setText] = useState<string>(''); // State for storing text in the terminal

    const handleKeyPress = (e: KeyboardEvent) => {
        const {key} = e;
        if (key === 'Backspace') {
            setText((prevText) => prevText.slice(0, -1));
        } else {
            setText((prevText) => prevText + key);
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <Canvas
            shadows
            camera={{position: [0, 5, 15], fov: 60}}
            style={{background: '#a3a3a3'}}
        >
            <ambientLight intensity={0.5}/>
            <directionalLight
                castShadow
                position={[5, 10, 7.5]}
                intensity={1}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <OrbitControls target={[0, 2, 0]}/>
            <Books/>
            <Cup/>
            <Laptop/>
            <mesh receiveShadow position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]}/>
                <shadowMaterial opacity={0.5}/>
            </mesh>
            {codeLines.map((line, index) => (
                <CodeLine
                    key={index}
                    position={[-5.5 + line.width / 2 + line.indent * 0.5, 7 - index * 0.5, -1.4]}
                    width={line.width}
                    color={line.color}
                    text={line.text}
                />
            ))}
            <Terminal position={[0, 0.75, -1.43]} text={text}/>
        </Canvas>
    );
};

export default BackgroundScene;
