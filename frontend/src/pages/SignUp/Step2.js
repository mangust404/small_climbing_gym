import React, { useEffect } from 'react';
import { InputAdornment, TextField, Alert } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Step2 (props) {
  const t = props.t;
  const setValues = (newValues) => {
    props.setFormState(prevState => {
      const newCollectedValues = {
        ...prevState.collectedValues,
        ...newValues
      };
      let isValid = true;
      let message = '';
      if (newCollectedValues.password != newCollectedValues.password2) {
        isValid = false;
        message = t('signup.password_mistmatch');
      }
      else if (!newCollectedValues.password || !newCollectedValues.password2 || !newCollectedValues.name) {
        isValid = false;
        //message = t('signup.fill_password');
      }
      return {
        ...prevState,
        currentStepIsValid: isValid,
        currentStepError: message? <Alert severity="error">{message}</Alert>: null,
        collectedValues: newCollectedValues
      };
    });
  }
  const handleChange = function(e) {
    const newValues = {};
    newValues[e.target.name] = e.target.value;

    setValues(newValues);
  }

  useEffect(() => {
    setValues({});
  }, []);

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          'data-testid': 'password1'
        }}
        variant="standard"
        margin="normal"
        required
        fullWidth
        name="password"
        label={t('signup.password')}
        type="password"
        id="password"
        onChange={handleChange}
        autoComplete="new-password"
        value={props.formState.collectedValues.password}
      />
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          'data-testid': 'password2'
        }}
        variant="standard"
        margin="normal"
        required
        fullWidth
        name="password2"
        label={t('signup.repeat_password')}
        type="password"
        id="password2"
        onChange={handleChange}
        autoComplete="new-password"
        value={props.formState.collectedValues.password2}
      />

      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          'data-testid': 'name'
        }}
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="name"
        label={t('signup.name')}
        name="name"
        onChange={handleChange}
        autoComplete="off"
        value={props.formState.collectedValues.name}
      />

    </>
  );
}