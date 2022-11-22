import { TextField, Button, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function RegisterPage(){

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isTA, setIsTA] = useState("");
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");


    const handleRegister = async () => {
        setErrorMsg("");
        name.trim();
        username.trim();
        password.trim();
        if(name == ""){
            setErrorMsg("Name can't be empty");
            return;
        }

        if(username == "" ){
            setErrorMsg("Username can't be empty");
            return;
        }


        if(password == "" ){
            setErrorMsg("Password can't be empty");
            return;
        }


        if(isTA === "" ){
            setErrorMsg("Select a designation");
            return;
        }

        try{
            await axios.post("http://localhost:8000/registerUser", {
                name, 
                username, 
                password, 
                isTA
            });
        }catch(error){
            console.log(error.response);
            setErrorMsg(error.response.data.errorMsg);
        }

        setErrorMsg("User Created Successfully!");
        setName("");
        setUsername("");
        setPassword("");
        setIsTA("");
    }


    return (<>
        <div
        style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "8px",
                padding: "20px 100px",
            }}
            >
                <Typography
                align="center"
                variant="h5"
                sx={{margin: "10px 0 15px 0"}}
                >
                    Register Page
                </Typography>

                {
                    errorMsg !== "" &&
                    <Typography
                    variant="h6"
                    color="red"
                    align="center"
                    sx={{margin: "5px 0"}}
                    >
                        {errorMsg}
                    </Typography>
                }


                <TextField variant="outlined" label="name" 
                value={name} onChange={(e) => {setName(e.target.value)}}  
                sx={{margin: "10px 0"}}/>

                <TextField variant="outlined" label="username" 
                value={username} onChange={(e) => {setUsername(e.target.value)}}  
                sx={{margin: "10px 0"}}/>

                
                <TextField variant="outlined" label="password" 
                value={password} onChange={(e) => {setPassword(e.target.value)}} 
                type="password" sx={{margin: "10px 0"}}/>


                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isTA}
                        label="Age"
                        onChange={(e) => {
                            setIsTA(e.target.value)
                        }}
                        >
                        <MenuItem value={true}>Talent Acquisition</MenuItem>
                        <MenuItem value={false}>Interviewer</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


                <Button
                variant="contained"
                sx={{
                    margin: "20px 0"
                }}
                onClick={handleRegister}
                >
                    Register
                </Button>
            </div>        
        </div>
    </>);
}
