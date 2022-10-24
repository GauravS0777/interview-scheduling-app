import { Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

export const Interviewer = () => {

    const navigate = useNavigate();
    const [state, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            navigate("/");
        }

        if(localStorage.getItem("isTA") === "true"){
            navigate("/ta");
        }
    }, [state])

    return(<>
        {/* <Navbar /> */}
        
        <LogoutBtn forceUpdate={forceUpdate}/>

        <Typography
        variant="h4"
        align="center"
        sx={{marginTop: "20px"}}
        >
            Interview Scheduling App
        </Typography>

        <Typography
        variant="h5"
        align="center"
        sx={{marginTop: "20px"}}
        >
            Pending Requests
        </Typography>
    </>);
}
