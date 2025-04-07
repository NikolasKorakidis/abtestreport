import React from 'react';
import { 
  AppBar, 
  Box, 
  Container, 
  Toolbar, 
  Typography, 
  Button,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 500,
            }}
          >
            A/B Test Reports
          </Typography>
          <Button
            component={RouterLink}
            to="/new"
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
          >
            New Test
          </Button>
        </Toolbar>
      </AppBar>
      <Container 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: 4,
          px: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} A/B Test Reports. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 