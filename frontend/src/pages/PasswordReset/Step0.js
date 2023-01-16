import React, { useEffect } from 'react';
import { InputAdornment, TextField, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export default function Step0 (props) {
  const t = props.t;
  // eslint-disable-next-line
  const emailIsValid = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const setEmail = function(email) {
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: emailIsValid(email),
        currentStepError: <Alert severity="warning">{t('signup.email_not_valid')}</Alert>,
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
        label={t('signup.email_label')}
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