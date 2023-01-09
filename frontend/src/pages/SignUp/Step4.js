import React, { useEffect } from 'react';
import { Typography, Popover, Slider } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import HelpIcon from '@mui/icons-material/Help';
import i18next from '../../i18n';

const grades = [
  {value: 1, label: '5A'}, {value: 2, label: '5B'}, {value: 3, label: '5C'},
  {value: 4, label: '6A'}, {value: 5, label: '6B'}, {value: 6, label: '6C'},
  {value: 7, label: '7A'}, {value: 8, label: '7B'}, {value: 9, label: '7C'},
  {value: 10, label: '8A'}, {value: 11, label: '8B'}, {value: 12, label: '8C'}
];

export default function Step4 (props) {
  const [grade, setGrade] = React.useState(props.formState.collectedValues.grade? props.formState.collectedValues.grade: [1, 4]);
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

  const { t } = useTranslation();

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
        {i18next.t('Preferred climbing grade')}
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
          <Trans t={t}>
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
        {i18next.t('leave it as default 5A-6A if you don\'t understand the grade system yet')}
      </Typography>
    </>
  );
}