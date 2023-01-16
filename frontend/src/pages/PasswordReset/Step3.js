import React, { useEffect } from 'react';
import { Typography, Link } from '@mui/material';

export default function Step5 (props) {
  const t = props.t;
  return (
    <>
      <Typography sx={{mt: 2, mb: 1}}>
        {t('password_reset.complete')}
        <br />
        <Link to="/sign-in">{t('signup.signin')}</Link>
      </Typography>
    </>
  );
}