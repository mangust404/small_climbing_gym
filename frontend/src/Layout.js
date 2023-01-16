import React from 'react';
import { renderToString } from 'react-dom/server'
import { Container, AppBar, Toolbar, Typography, Button, Link, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Outlet } from 'react-router-dom';
import i18next from './i18n';
import SvgLogo from './components/SvgLogo';
import Footer from './components/Footer';
import { Trans } from 'react-i18next'

export default function Layout(props) {
  const t = props.t;


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
            {t('header.company_name')}
            <Chip
              variant="outlined"
              label={t('header.sub_logo_button')}
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
              {t('header.link_home')}
            </Link>
            <Link
              variant="button"
              color="text.primary"
              to="/visit"
              sx={{ my: 1, mx: 1.5, color: 'primary.main' }}
            >
              {t('header.link_visit')}
            </Link>
          </nav>
          {
            props.a14n.name ?
              <FormControl sx={{  }} size="small">
                <InputLabel id="user-select-label"></InputLabel>
                <Select
                  labelId="user-select-label"
                  id="user-select"
                  value="username"
                  data-testid="user-logged-in"
                  sx={{
                    py: 0
                  }}
                >
                  <MenuItem sx={{ display: 'none'}} value="username"><Trans t={t} i18nKey="header.welcome_back" values={{ username: props.a14n.name}} /></MenuItem>
                  <MenuItem><Link to="/sign-out">{t('header.logout')}</Link></MenuItem>
                </Select>
              </FormControl>
            : 
              <Button to="sign-in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                {t('header.login')}
              </Button>
          }
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Outlet />
      </Container>

      <Footer setLang={props.setLang} lang={props.lang} />
    </>
  );
}