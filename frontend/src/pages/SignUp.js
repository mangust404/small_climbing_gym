import React, { Suspense, useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { Container, Typography, Stepper, Step, StepLabel, Box, Grid, Alert, Button, CircularProgress } from '@mui/material';
import i18next from '../i18n';
import callApiFetch from '../helpers/callApiFetch';

const steps = [
  'signup.steps.0',
  'signup.steps.1',
  'signup.steps.2',
  'signup.steps.3',
  'signup.steps.4'].map(i18next.t);

const StepsComponents = {
  'Step0': React.lazy(() => import('./SignUp/Step0')),
  'Step1': React.lazy(() => import('./SignUp/Step1')),
  'Step2': React.lazy(() => import('./SignUp/Step2')),
  'Step3': React.lazy(() => import('./SignUp/Step3')),
  'Step4': React.lazy(() => import('./SignUp/Step4'))
};

export default function SignUp() {
  const [formState, setFormState] = React.useState({
                                      activeStep: 0,
                                      inProgress: false,
                                      currentStepIsValid: false,
                                      currentStepError: '',
                                      showError: false,
                                      skipped: new Set(),
                                      collectedValues: {
                                        lang: i18next.language,
                                        email: ''
                                      }
                                    });

  const [skipped, setSkipped] = React.useState(new Set());
  const CurrentStep = StepsComponents[`Step${formState.activeStep}`];

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const constNextStep = (formState) => {
    let newSkipped = formState.skipped;
    if (isStepSkipped(formState.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(formState.activeStep);
    }
    return {
      ...formState,
      activeStep: formState.activeStep + 1,
      skipped: newSkipped,
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
        callApiFetch('sign-up/email', prevFormState.collectedValues)
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
                      currentStepError: <Alert severity="error">{i18next.t('signup.wrong_code')}</Alert>
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
      else if (prevFormState.activeStep === 4) {
        // Final step, submit collected data
          callApiFetch('sign-up/finish', prevFormState.collectedValues)
            .then(
              (result) => {
                if (result.success) {
                  redirect('/sign-in');
                }
                else {
                  setFormState((prevFormState) => {
                    return {
                      ...prevFormState,
                      showError: true,
                      inProgress: false,
                      currentStepError: <Alert severity="error">{i18next.t(result.error)}</Alert>
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

  const handleSkip = () => {
    if (!isStepOptional(formState.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error(i18next.t('You can\'t skip a step that isn\'t optional.'));
    }

    setFormState(prevFormState => {
      const newSkipped = new Set(prevFormState.skipped.values());
      newSkipped.add(prevFormState.activeStep);

      return {
        ...prevFormState,
        activeStep: prevFormState.activeStep + 1,
        skipped: newSkipped,
        currentStepIsValid: false,
        showError: false
      }
    });
  };

  return (
    <Container component="main">
      <Typography component="h1" variant="h5" sx={{textAlign: 'center'}}>
        {i18next.t('signup.title')}
      </Typography>

      <Stepper activeStep={formState.activeStep} sx={{marginTop: 2}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

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
              <Suspense fallback={<div>{i18next.t('signup.please_wait')}</div>}>
                <CurrentStep formState={formState} setFormState={setFormState} />
              </Suspense>

              <Box sx={{mt: 2}}>
                {formState.showError && formState.currentStepError ? formState.currentStepError : ''}
                {formState.showError && <Alert severity="error">{i18next.t('signup.fill_all_to_proceed')}</Alert>}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%' }}>
                <Button
                  color="inherit"
                  disabled={formState.activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {i18next.t('signup.back')}
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(formState.activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    {i18next.t('signup.skip')}
                  </Button>
                )}

                {
                  formState.inProgress ?
                    <CircularProgress data-testid="spinner" />
                    :
                    <Button onClick={handleNext} data-testid="submit-button">
                      {formState.activeStep === steps.length - 1 ? i18next.t('signup.finish') : i18next.t('signup.next')}
                    </Button>
                }
                
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}