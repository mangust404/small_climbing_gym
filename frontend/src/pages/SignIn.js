import React from 'react';
import { Avatar, Button, InputAdornment, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import theme from '../theme.js';
import i18next from '../i18n';

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
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
          {i18next.t('signin.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18next.t('signin.email_label')}
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
            }}
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18next.t('signin.pass_label')}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" defaultChecked />}
            label={i18next.t('signin.remember')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {i18next.t('signin.button')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/password-reset" variant="body2">
                {i18next.t('signin.password_reset')}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sign-up" variant="body2">
                {i18next.t('signin.signup')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}