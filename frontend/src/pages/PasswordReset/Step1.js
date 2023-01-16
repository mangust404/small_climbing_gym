import React from 'react';
import { InputAdornment, TextField, Alert, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';

export default function Step1 (props) {
  const t = props.t;
  const handleChange = function(e) {
    const code = e.target.value;
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: code.length === 5,
        currentStepError: <Alert severity="error">{t('signup.code_not_valid')}</Alert>,
        collectedValues: {
          ...prevState.collectedValues,
          code
        }
      };
    });
  }
  return (
    <>
      <Typography>{t('password_reset.code_sent')}</Typography>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
          'data-testid': 'confirmation-code'
        }}
        variant="standard"
        margin="normal"
        required
        fullWidth
        onChange={handleChange}
        name="confirmation_code"
        label={t('signup.confirmation_code')}
        type="text"
        id="confirmation_code"
        autoComplete="off"
      />
    </>
  );
}