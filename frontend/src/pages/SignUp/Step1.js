import React from 'react';
import { InputAdornment, TextField, Alert, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import i18next from '../../i18n';

export default function Step1 (props) {
  const handleChange = function(e) {
    const code = e.target.value;
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: code.length === 5,
        currentStepError: <Alert severity="error">{i18next.t('Code is not valid')}</Alert>,
        collectedValues: {
          ...prevState.collectedValues,
          code
        }
      };
    });
  }
  return (
    <>
      <Typography>{i18next.t('We sent you confirmation code. Check your mail.')}</Typography>
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
        label={i18next.t('Confirmation code')}
        type="text"
        id="confirmation_code"
        autoComplete="off"
      />
    </>
  );
}