import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';

import { useState, useCallback } from 'react';


export default function InterviewerCard(props) {

  console.log(props);

  const [, updateState] = useState();
const forceUpdate = useCallback(() => updateState({}), []);

  const sendInterviewRequest = async () => {
    const data = {
      "time": props.timeValue,
      "interviewerID": props.data._id
    }

    try{
      await axios.post("http://localhost:8000/sendRequest", data, {
        headers: {
        "accessToken": localStorage.getItem("accessToken")
        }
      });
      props.data.busy = true;
      forceUpdate();

    }catch(error){
      console.log(error);
    }
  }

  const cancelClciked = async () => {
    const data = {
      "interviewerID": props.data._id
    }

    try{
      await axios.post("http://localhost:8000/cancelRequest", data, {
        headers: {
        "accessToken": localStorage.getItem("accessToken")
        }
      });
      props.data.busy = false;
      forceUpdate();

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
          <Typography>
            {props.data.name}
          </Typography>

          {
            props.data.busy ?

            <div>

            <Button 
            variant="contained"
            sx={{textTransform: "none"}}
            disabled={true}
            >
              <strong>Pending</strong>
            </Button>

            <Button 
            variant="contained"
            sx={{textTransform: "none", backgroundColor: "red", margin: "0 10px", "&:hover": {backgroundColor: "red"}}}
            onClick={cancelClciked}
            >
              Cancel
            </Button>

            </div>   
            :
            <Button 
            variant="contained"
            sx={{textTransform: "none"}}
            onClick={sendInterviewRequest}
            >
              Interview request
            </Button>
          }
        </div>

      </CardContent>
    </Card>
  );
}
