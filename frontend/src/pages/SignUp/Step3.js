import React, { useEffect } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'

import i18next from '../../i18n';

export default function Step3 (props) {
  const [phone, setPhone] = React.useState(props.formState.collectedValues.phone? props.formState.collectedValues.phone: '+77')

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone)
  }

  useEffect(() => {
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: true,
        currentStepError: null,
        collectedValues: {
          ...prevState.collectedValues,
          phone
        }
      };
    });
  }, [phone]);

  return (
    <>
      <MuiTelInput
        value={phone}
        onChange={handlePhoneChange}
        data-testid="phone"

        focusOnSelectCountry
        onlyCountries={['KZ']}
        preferredCountries={['KZ']}
        
      />
    </>
  );
}