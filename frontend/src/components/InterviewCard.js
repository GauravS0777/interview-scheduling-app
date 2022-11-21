import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import RescheduleForm from "./RescheduleForm"
import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';


export default function InterviewCard(props) {

  const [date, setDate] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  console.log(date)

  useEffect(() => {
    setDate(new Date(props.data.time));
  }, [props]);


  return (
    <>
    <Card sx={{ minWidth: 100, maxWidth: 250, margin: "20px auto" }}>
      <CardContent>
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

        <Button 
          sx={{
            margin: "0 auto",
            display: "block",
            marginTop: "10px",
            textTransform: "none"
          }}
          variant="contained"
          onClick={handleOpen}
        >Reschedule</Button>
      </CardContent>
    </Card>

    <RescheduleForm handleOpen={handleOpen} handleClose={handleClose} open={open} _id={props.data._id} forceUpdate={props.forceUpdate}/>
    </>
  );
}
