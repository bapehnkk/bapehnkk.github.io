import React from 'react';
import Desktop from '@/components/desktop/Desktop';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const App: React.FC = () => {
    return (
                <ThemeProvider theme={theme}>
                    <CssBaseline />
            <Desktop />
                </ThemeProvider>
    );
};

export default App;
