import React, { useEffect } from 'react';
import { Typography, Popover, Slider } from '@mui/material';
import { Trans } from 'react-i18next';
import HelpIcon from '@mui/icons-material/Help';

const grades = [
  {value: 1, label: '5A'}, {value: 2, label: '5B'}, {value: 3, label: '5C'},
  {value: 4, label: '6A'}, {value: 5, label: '6B'}, {value: 6, label: '6C'},
  {value: 7, label: '7A'}, {value: 8, label: '7B'}, {value: 9, label: '7C'},
  {value: 10, label: '8A'}, {value: 11, label: '8B'}, {value: 12, label: '8C'}
];

export default function Step4 (props) {
  const t = props.t;

  const [grade, setGrade] = React.useState(props.formState.collectedValues.grade);
  const handleGradeChange = (event, newValue) => {
    setGrade(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    props.setFormState(prevState => {
      return {
        ...prevState,
        currentStepIsValid: true,
        currentStepError: null,
        collectedValues: {
          ...prevState.collectedValues,
          grade
        }
      };
    });
  }, [grade]);

  return (
    <>
      <Typography sx={{display: 'flex', mt: 2, mb: 1}}>
        {t('signup.climbing_grade')}
        <HelpIcon
          aria-describedby={id}
          onClick={handleClick}
          sx={{cursor: 'pointer', ml: 2}}
        />
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, whiteSpace: 'pre' }}>
          <Trans t={t} i18nKey="signup.grades_content">
            Right value - is your <b>max</b> grade on which you're<br />
            progressing right now.<br /><br />
            The lower value - is the grade on which you usually<br />
            start warming up.<br /><br />
            Please provide correct values because this<br />
            information may <b>affect</b> other people's decision<br />
            about visiting the gym at the same time.<br /><br />
            Keep in mind that it's more fun and effective to train<br />
            with people on <b>about the same</b> level as you.
          </Trans>
        </Typography>
      </Popover>
      <Slider
        value={grade}
        min={1}
        step={1}
        max={12}
        defaultValue={[1, 4]}
        onChange={handleGradeChange}
        marks={grades}
        data-testid="slider"
      />
      <Typography variant="caption" display="block" gutterBottom color="muted">
        {t('signup.climbing_footer')}
      </Typography>
    </>
  );
}