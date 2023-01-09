import React, { useEffect } from 'react';
import { InputAdornment, TextField, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import i18next from '../../i18n';

export default function Step0 (props) {
  // eslint-disable-next-line
  const emailIsValid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const setEmail = function(email) {
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: emailIsValid(email),
        currentStepError: <Alert severity="warning">{i18next.t('Email is not valid')}</Alert>,
        collectedValues: {
          ...prevState.collectedValues,
          email
        }
      };
    });
  }

  const handleChange = function(e) {
    const email = e.target.value;
    setEmail(email);
  }

  useEffect(() => {
    setEmail(props.formState.collectedValues.email);
  }, []);

  return (
    <>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
          'data-testid': 'email'
        }}
        variant="standard"
        margin="normal"
        required
        fullWidth
        id="email"
        label={i18next.t('signup.email_label')}
        onChange={handleChange}
        disabled={props.formState.inProgress}
        value={props.formState.collectedValues.email}
        name="email"
        autoFocus
        autoComplete="off"
      />
    </>
  );
}