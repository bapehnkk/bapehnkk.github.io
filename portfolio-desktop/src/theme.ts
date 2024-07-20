import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4a5568', // Gray-600
            dark: '#2d3748', // Gray-800
        },
        secondary: {
            main: '#a0aec0', // Gray-400
            dark: '#718096', // Gray-500
        },
        background: {
            default: '#ffffff', // White
            paper: '#ffffff', // White
        },
        text: {
            primary: '#1a202c', // Gray-900
            secondary: '#4a5568', // Gray-600
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                    },
                },
            },
        },
    },
});

export default theme;
