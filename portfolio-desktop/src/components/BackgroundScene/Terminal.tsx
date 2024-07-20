import React, { useState, useEffect, useMemo } from 'react';
import { RoundedBox, Text } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

const breakText = (text: string, maxLineLength: number): string => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word: string) => {
        if (currentLine.length + word.length + 1 <= maxLineLength) {
            currentLine += (currentLine.length > 0 ? ' ' : '') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines.join('\n');
};

interface TerminalProps {
    position: [number, number, number];
    text: string;
}

const Terminal: React.FC<TerminalProps> = ({ position, text }) => {
    const [showCursor, setShowCursor] = useState(true);
    const [scrollOffset, setScrollOffset] = useState(0);
    const maxVisibleLines = 8;

    const formattedText = useMemo(() => breakText(text, 60).split('\n'), [text]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleScroll = (e: ThreeEvent<WheelEvent>) => {
        e.stopPropagation();
        if (e.deltaY < 0) {
            setScrollOffset((prev) => Math.max(0, prev - 1));
        } else {
            setScrollOffset((prev) => Math.min(formattedText.length - maxVisibleLines, prev + 1));
        }
    };

    const visibleText = useMemo(() => {
        return formattedText.slice(scrollOffset, scrollOffset + maxVisibleLines).join('\n');
    }, [formattedText, scrollOffset]);

    return (
        <group position={position} onWheel={handleScroll}>
            <RoundedBox
                args={[11.75, 1.75, 0.1]}
                radius={0.05}
                smoothness={4}>
                <meshStandardMaterial color="#000000" />
            </RoundedBox>
            <Text
                position={[-5.5, 0.5, 0.06]}
                fontSize={0.2}
                color="green"
                anchorX="left"
                anchorY="middle"
                maxWidth={10}
                overflowWrap="break-word"
            >
                {">"}
            </Text>
            <Text
                position={[-4.9, 0.5, 0.06]}
                fontSize={0.2}
                color="white"
                anchorX="left"
                anchorY="middle"
                maxWidth={10}
                clipRect={[0, -1.3, 10, 0.3]} // Define the clipping area
                overflowWrap="break-word"
            >
                {visibleText}
                {showCursor ? '|' : ''}
            </Text>
        </group>
    );
};

export default Terminal;
