import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import TimeBox from "./TimeBox";
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RescheduleForm(props) {

    const [value, setValue] = React.useState(dayjs('2022-11-15T10:00:00'));

    const handleSubmit = async () =>{
        const payload = {
            "_id": props._id,
            "time": value
        }
        try{
            await axios.post("http://localhost:8000/rescheduleInterview", payload, {
                headers:{
                    "accessToken": localStorage.getItem("accessToken")
                }
            });
        }catch(error){
            console.log(error);
        }

        props.handleClose();
        props.forceUpdate();
    }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            <TimeBox setValue={setValue} value={value}/>


            <div
            style={{
                display: "flex",
                justifyContent: "flex-end"
            }}
            >
            <Button
                variant="contained"
                sx={{
                    textTransform: "none"
                }}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            </div>



          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}