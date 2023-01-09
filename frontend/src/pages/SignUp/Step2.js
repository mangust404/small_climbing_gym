import React, { useEffect } from 'react';
import { InputAdornment, TextField, Alert } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircle from '@mui/icons-material/AccountCircle';
import i18next from '../../i18n';

export default function Step2 (props) {
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
        message = i18next.t('signup.password_mistmatch');
      }
      else if (!newCollectedValues.password || !newCollectedValues.password2 || !newCollectedValues.name) {
        isValid = false;
        //message = i18next.t('signup.fill_password');
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
        label={i18next.t('Password')}
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
        label={i18next.t('Repeat password')}
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
        label={i18next.t('Name (visible to others)')}
        name="name"
        onChange={handleChange}
        autoComplete="off"
        value={props.formState.collectedValues.name}
      />

    </>
  );
}