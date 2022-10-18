import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function InterviewerCard(props) {

  console.log(props);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: "20px auto" }}>
      <CardContent>
        <Typography>
          {props.data.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
