import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Desktop from '@/components/desktop/Desktop';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const App: React.FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
            <Desktop />
                </ThemeProvider>
            </React.StrictMode>,
        </DndProvider>
    );
};

export default App;
