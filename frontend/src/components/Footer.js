import React from 'react';
import { Container, Link, Typography } from '@mui/material';
import i18next from '../i18n';

export default function Footer(props) {
  return (
    <>
      <Container sx={{py: 4, justifyContent: 'center', alignItems: 'baseline', display: 'flex'}}>
        <Link
          variant="button"
          color="success.main"
          to="/"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('Home')}
        </Link>
        <Link
          variant="button"
          color="success.main"
          to="/visit"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('Visit')}
        </Link>
        <Link
          variant="button"
          color="success.main"
          to="/terms"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('Terms & conditions')}
        </Link>
        <Link
          variant="button"
          color="success.main"
          to="/faq"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('FAQ')}
        </Link>

        <Typography sx={{ml: 4}}>© Kilter club Almaty {(new Date()).getFullYear()}</Typography>
      </Container>
    </>
  );
}