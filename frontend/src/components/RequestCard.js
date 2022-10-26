import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import axios from 'axios';

import { useState, useCallback, useEffect } from 'react';


export default function RequestCard(props) {

  const [date, setDate] = useState();

  console.log(date)

  useEffect(() => {
    setDate(new Date(props.data.time));
  }, []);

  return (
    <Card sx={{ minWidth: 275, maxWidth: 500, margin: "20px auto" }}>
      <CardContent>

        <div
        style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
        >

          <div>
            <Typography>
              On {date?.getDate()}/{date?.getMonth() + 1}/{date?.getFullYear()}
            </Typography>

            <Typography>
              At {date?.getHours()}:{date?.getMinutes() < 10 ? `0${date.getMinutes()}` : date?.getMinutes()}
            </Typography>
          </div>


            <div>
                <Button 
                variant="contained"
                sx={{textTransform: "none"}}
                >
                    Accept
                </Button>

                <Button 
                variant="contained"
                sx={{textTransform: "none", backgroundColor: "red", margin: "0 10px", "&:hover": {backgroundColor: "red"}}}
                >
                    Reject
                </Button>

            </div> 
        </div>
      </CardContent>
    </Card>
  );
}
