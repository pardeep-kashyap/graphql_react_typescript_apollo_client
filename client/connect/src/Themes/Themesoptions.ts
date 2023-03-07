import { ThemeOptions } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#df2b63',
        },
        secondary: {
            main: '#3e3e54',
        },
    },
};

export const THEME = createTheme(themeOptions);
