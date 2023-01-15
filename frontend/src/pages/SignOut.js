import * as React from 'react';
import { Paper } from '@mui/material';
import { Navigate } from 'react-router-dom';

export default function SignOut(props) {
  const t = props.t;

  props.setA14n(prevState => {
    return {
      token: '',
      name: '',
      remember: prevState.remember
    }
  })

  return (
    <Paper
      sx={{
        position: 'relative',
        mb: 4
      }}
    >
      {!props.a14n.token && !props.a14n.name && <Navigate to="/" />}
    </Paper>
  );
}