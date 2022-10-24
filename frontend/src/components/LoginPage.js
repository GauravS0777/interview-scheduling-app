import { TextField, Button, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            const isTA = localStorage.getItem("isTA") === "true";
            console.log(isTA);
            if(isTA){
                navigate("/ta");
            }else{
                navigate("/in");
            }
        }
    }, [])

    const loginClicked = async () => {
        try{
            const response = await axios.post("http://localhost:8000/api/user/login", {
                "username": username,
                "password": password
            });

            const data = response.data;

            localStorage.setItem("username", data.username);
            localStorage.setItem("isTA", data.isTA);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToke", data.refreshToken);

            if(data.isTA){
                navigate("/ta");
            }else{
                navigate("/in");
            }
        }catch(error){
            console.log(error);
            setErrorMsg("Invalid Credentials!")
        }
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
                    Login Page
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

                <TextField variant="outlined" label="username" 
                value={username} onChange={(e) => {setUsername(e.target.value)}}  
                sx={{margin: "10px 0"}}/>
                
                <TextField variant="outlined" label="password" 
                value={password} onChange={(e) => {setPassword(e.target.value)}} 
                type="password" sx={{margin: "10px 0"}}/>

                <Button
                variant="contained"
                sx={{
                    margin: "20px 0"
                }}
                onClick={loginClicked}
                >
                    Login
                </Button>
            </div>        
        </div>
    </>)

}