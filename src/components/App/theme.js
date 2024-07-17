import { createTheme } from "@mui/material"

export const tinklTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            // periwinkle - AppBar
            main: '#5272F2',
            // off-white - navbar text. Formerly: #072541
            contrastText: '#FFF6F6',
            light: '#FFF6F6',
        },
        secondary: {
            main: '#d20353',

            contrastText: '#ffffff',
        },
        background: {

            default: '#FBECB2',
            // light pink
            paper: '#ffe6e8',
        },
        text: {
            // black
            primary: '#000000',
            // lighter grey
            disabled: '#7b848a',
            // charcoal grey - subheadings, etc
            secondary: '#36454F',
            hint: '#421292'
        },
        error: {
            main: '#c42323',
        },
        info: {
            main: '#3759de',
        },
        success: {
            main: '#43ab46',
        },
        warning: {
            main: '#ed0202',
        },
        divider: '#00695c',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },

})