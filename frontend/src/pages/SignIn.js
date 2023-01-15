import React from 'react';
import { Avatar, Button, InputAdornment, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import theme from '../theme.js';
import callApiFetch from '../helpers/callApiFetch';
import { Navigate } from 'react-router-dom';

export default function SignIn(props) {
  const t = props.t;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    callApiFetch('user/sign-in', {
      email: data.get('email'),
      password: data.get('password'),
      remember: data.get('remember')? true: false
    }).then((result) => {
      if (result.success) {
        props.setA14n(prevState => {
          return {
            remember: data.get('remember')? true: false,
            token: result.token,
            name: result.name
          }
        })
      }
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      {props.a14n && props.a14n.name && props.a14n.token && <Navigate to="/" />}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.dark', boxShadow: `0px 0px 10px ${theme.palette.primary.dark}` }}>
          <LockOutlinedIcon htmlColor={theme.palette.primary.light} />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signin.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              'data-testid': 'email'
            }}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('signin.email_label')}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
              'data-testid': 'password'
            }}
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('signin.pass_label')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" name="remember" color="primary" defaultChecked />}
            label={t('signin.remember')}
          />
          <Button
            type="submit"
            data-testid="sign-in"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('signin.button')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/password-reset" variant="body2">
                {t('signin.password_reset')}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                {t('signin.signup')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}