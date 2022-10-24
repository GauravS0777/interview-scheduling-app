import { Typography } from "@mui/material";
import TimeBox from "./TimeBox";
import InterviewerCard from "./InterviewerCard";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";


export const TalentAcquisition = () => {

    const [value, setValue] = React.useState(dayjs('2022-08-18T10:00:00'));
    const [interviewers, setInterviewers] = useState([]);
    const navigate = useNavigate();

    const [state, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            navigate("/");
        }

        if(localStorage.getItem("isTA") === "false"){
            navigate("/in");
        }
    }, [state])

    const fetchInterviewersList = async () => {
        try{
            const list = await axios.get("http://localhost:8000/interviewersList", {
                headers: {
                    "accessToken": localStorage.getItem("accessToken")
                }
            });

            setInterviewers(list.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInterviewersList();
    }, []);

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

        <TimeBox setValue={setValue} value={value}/>

        {
            interviewers.map((val) => {
                return <InterviewerCard data={val} timeValue={value}/>
            })
        }

    </>);
}
