import { Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import axios from "axios";
import RequestCard from "./RequestCard";

export const Interviewer = () => {

    const navigate = useNavigate();
    const [state, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            navigate("/");
        }

        if(localStorage.getItem("isTA") === "true"){
            navigate("/ta");
        }
    }, [state])


    const fetchRequests = async () => {
        try{
            const response = await axios.get("http://localhost:8000/getRequests", {
                "headers":{
                    "accessToken": localStorage.getItem("accessToken")
                }
            })

            console.log(response.data.data);
            setRequestList(response.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

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

        {
            requestList.map((value, idx) => {
                return <RequestCard data={value} key={idx}/>
            })
        }
    </>);
}
