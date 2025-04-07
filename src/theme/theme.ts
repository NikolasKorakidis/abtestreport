import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4', // Google Blue
      light: '#7BAAF7',
      dark: '#3367D6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#34A853', // Google Green
      light: '#68C07C',
      dark: '#2E7D32',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EA4335', // Google Red
      light: '#EF6F65',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FBBC04', // Google Yellow
      light: '#FCD33D',
      dark: '#F9A825',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
}); 