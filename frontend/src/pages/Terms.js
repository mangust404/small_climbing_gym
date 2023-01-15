import * as React from 'react';
import { Paper } from '@mui/material';
//import i18next from '../i18n';

export default function Terms(props) {
  const i18next = props.i18next;
  return (
    <Paper
      sx={{
        position: 'relative',
        mb: 4
      }}
    >
      Todo Terms & Rules
    </Paper>
  );
}