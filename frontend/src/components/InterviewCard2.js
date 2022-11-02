import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';


export default function InterviewCard2(props) {

  const [date, setDate] = useState();

  console.log(date)

  useEffect(() => {
    setDate(new Date(props.data.time));
  }, []);


  return (
    <Card sx={{ minWidth: 100, maxWidth: 400, margin: "20px auto" }}>
      <CardContent>
        <Typography
        align="center"
        sx={{marginBottom: "20px"}}
        >
              Interviewer: {props.data.interviewerName}
        </Typography>
        
        <div
        style={{display: "flex", alignItems: "center", justifyContent: "space-around"}}
        >

            <Typography>
              Date {date?.getDate()}/{date?.getMonth() + 1}/{date?.getFullYear()}
            </Typography>

            <Typography>
              Time {date?.getHours()}:{date?.getMinutes() < 10 ? `0${date.getMinutes()}` : date?.getMinutes()}
            </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
