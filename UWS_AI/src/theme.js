import { createTheme } from '@mui/material/styles';

// theme.js

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff1744', // Red primary
        },
        secondary: {
            main: '#ffffff', // White as secondary
        },
        background: {
            default: '#ffffff', // Default background is white
            paper: '#ffffff', // Background for cards
        },
        text: {
            primary: '#ff1744', // Red for text
            secondary: '#000000', // Black for secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default theme;
