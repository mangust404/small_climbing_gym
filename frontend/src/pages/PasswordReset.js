import React, { Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert, Container, Typography, Box, Grid, Button, CircularProgress } from '@mui/material';
import callApiFetch from '../helpers/callApiFetch';

const StepsComponents = {
  'Step0': React.lazy(() => import('./PasswordReset/Step0')),
  'Step1': React.lazy(() => import('./PasswordReset/Step1')),
  'Step2': React.lazy(() => import('./PasswordReset/Step2')),
  'Step3': React.lazy(() => import('./PasswordReset/Step3')),
};

export default function Visit(props) {
  const t = props.t;

  const [formState, setFormState] = React.useState({
                                      activeStep: 0,
                                      inProgress: false,
                                      currentStepIsValid: false,
                                      currentStepError: '',
                                      showError: false,
                                      collectedValues: {
                                        email: '',
                                        code: '',
                                        password: '',
                                        password2: ''
                                      }
                                    });

  const [skipped, setSkipped] = React.useState(new Set());
  const CurrentStep = StepsComponents[`Step${formState.activeStep}`];

  const constNextStep = (formState) => {
    return {
      ...formState,
      activeStep: formState.activeStep + 1,
      showError: false
    }
  }

  const handleNext = () => {
    setFormState((prevFormState) => {
      if (!prevFormState.currentStepIsValid) {
        return {
          ...prevFormState,
          showError: true
        }
      }

      if (prevFormState.activeStep === 0) {
        // send email to the backend
        callApiFetch('user/password-reset', prevFormState.collectedValues)
          .then(
            (result) => {
              if (result.success) {
                setFormState((prevFormState) => {
                  return constNextStep({
                    ...prevFormState,
                    inProgress: false,
                    collectedValues: {
                      ...prevFormState.collectedValues,
                      ...result.data
                    }
                  });
                });
              }
              else {
                setFormState((prevFormState) => {
                  return {
                    ...prevFormState,
                    showError: true,
                    inProgress: false,
                    currentStepError: <Alert severity="error">{result.error}</Alert>
                  }
                });
              }
            },
            (error) => {
              console.log('error', error);
            }
          );
        return {
          ...prevFormState,
          inProgress: true
        };
      }
      else if(prevFormState.activeStep === 1) {
        if (prevFormState.collectedValues.code) {
          // check confirmation code
          callApiFetch('sign-up/code', prevFormState.collectedValues)
            .then(
              (result) => {
                if (result.success) {
                  setFormState((prevFormState) => {
                    return constNextStep({
                      ...prevFormState,
                      inProgress: false,
                      currentStepError: null,
                      collectedValues: {
                        ...prevFormState.collectedValues,
                        ...result.data
                      }
                    });
                  });
                }
                else {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      showError: true,
                      inProgress: false,
                      currentStepError: <Alert severity="error">{t('signup.wrong_code')}</Alert>
                    }
                  });
                }
              }
            );
        }
        return {
          ...prevFormState,
          inProgress: true
        };
      }
      else if (prevFormState.activeStep === 2) {
        // Final step, submit collected data
          callApiFetch('user/password-set', prevFormState.collectedValues)
            .then(
              (result) => {
                if (result.success) {
                  setFormState((prevFormState) => {
                    return constNextStep(prevFormState);
                  });
                }
                else {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      showError: true,
                      inProgress: false,
                      currentStepError: <Alert severity="error">{t(result.error)}</Alert>
                    }
                  });
                }
              }
            );
        return {
          ...prevFormState,
          inProgress: true
        };
      }
      else {
        return constNextStep(prevFormState);
      }
    });
  };

  const handleBack = () => {
    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        activeStep: prevFormState.activeStep - 1,
        currentStepIsValid: false,
        showError: false
      }
    });
  };

  return (
    <Container component="main">
      {props.a14n && props.a14n.name && props.a14n.token && <Navigate to="/" />}
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        {t('password_reset.title')}
      </Typography>

      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate sx={{ mt: 1 }} autoComplete="off">
            <Grid container>
              <Suspense fallback={<div>{t('signup.please_wait')}</div>}>
                <CurrentStep formState={formState} setFormState={setFormState} i18next={props.i18next} t={props.t} />
              </Suspense>

              <Box sx={{mt: 2}}>
                {formState.showError && formState.currentStepError ? formState.currentStepError : ''}
                {formState.showError && <Alert severity="error">{t('signup.fill_all_to_proceed')}</Alert>}
              </Box>

              {formState.activeStep < 3 && 
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%' }}>
                  <Button
                    color="inherit"
                    disabled={formState.activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {t('signup.back')}
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />

                  {
                    formState.inProgress ?
                      <CircularProgress data-testid="spinner" />
                      :
                      <Button onClick={handleNext} data-testid="submit-button">
                        {formState.activeStep === StepsComponents.length - 1 ? t('signup.finish') : t('signup.next')}
                      </Button>
                  }
                  
                </Box>
              }
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}