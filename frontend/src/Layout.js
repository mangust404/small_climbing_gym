import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Link, Chip } from '@mui/material';
import { Outlet } from 'react-router-dom';
import i18next from './i18n';
import SvgLogo from './components/SvgLogo';
import Footer from './components/Footer';

export default function Layout() {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <SvgLogo sx={{width: 60, height: 60}} />
          <Typography variant="h6" color="primary.main" noWrap sx={{ flexGrow: 1 }}>
            {i18next.t('header.company_name')}
            <Chip
              variant="outlined"
              label={i18next.t('header.sub_logo_button')}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'inline-flex'
                },
                ml: 2,
                color: 'warning.main'
              }}
            />
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              to="/"
              sx={{ my: 1, mx: 1.5, color: 'primary.main' }}
            >
              {i18next.t('header.link_home')}
            </Link>
            <Link
              variant="button"
              color="text.primary"
              to="/visit"
              sx={{ my: 1, mx: 1.5, color: 'primary.main' }}
            >
              {i18next.t('header.link_visit')}
            </Link>
          </nav>
          <Button to="sign-in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
}