import * as React from 'react';
import { Card, CardHeader, Avatar, Typography } from '@mui/material';

export default function HomeCard(props) {
  return (
    <Card sx={{ width: 340, mb: 4 }}>
      <CardHeader
        sx={{alignItems: 'flex-start' }}
        avatar={
          <Avatar sx={{ bgcolor: props.color, boxShadow: `0px 0px 10px ${props.color}` }} aria-label="recipe">
            {props.icon}
          </Avatar>
        }
        title={<Typography variant="h5">{props.title}</Typography>}
        subheader={props.content}
      />
    </Card>
  );
}