import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';


export default function RequestCard(props) {

  const [date, setDate] = useState();

  console.log(props)

  useEffect(() => {
    setDate(new Date(props.data.time));
  }, []);

  const acceptRequest = async () => {
    try{
      const response = await axios.post("http://localhost:8000/acceptRequest", props.data, {
        "headers": {
          "accessToken": localStorage.getItem("accessToken") 
        }
      })

      console.log(response);
      props.forceUpdate();
    }catch(error){
      console.log(error);
    }
  }


  const rejectRequest = async () => {
    try{
      const response = await axios.post("http://localhost:8000/rejectRequest", props.data, {
        "headers": {
          "accessToken": localStorage.getItem("accessToken") 
        }
      })

      console.log(response);
      props.forceUpdate();
    }catch(error){
      console.log(error);
    }
  }


  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: "20px auto" }}>
      <CardContent>

        <div
        style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
        >

          <div>
            <Typography>
              Date {date?.getDate()}/{date?.getMonth() + 1}/{date?.getFullYear()}
            </Typography>

            <Typography>
              Time {date?.getHours()}:{date?.getMinutes() < 10 ? `0${date.getMinutes()}` : date?.getMinutes()}
            </Typography>
          </div>


            <div>
                <Button 
                variant="contained"
                sx={{textTransform: "none"}}
                onClick={acceptRequest}
                >
                  Accept
                </Button>

                <Button 
                variant="contained"
                sx={{textTransform: "none", backgroundColor: "red", margin: "0 10px", "&:hover": {backgroundColor: "red"}}}
                onClick={rejectRequest}
                >
                    Reject
                </Button>

            </div> 
        </div>
      </CardContent>
    </Card>
  );
}
