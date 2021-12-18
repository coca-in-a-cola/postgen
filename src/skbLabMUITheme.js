import { createTheme } from '@mui/material/styles';

export const skbLabMUITheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00AA13',
    },
    secondary: {
      main: '#FF7500',
    },
    error: {
      main: '#E0004D',
    },
    warning: {
      main: '#FFC600',
    },
    success: {
      main: '#97D700',
    },
    info: {
      main: '#37a5dd',
    },
  },
})