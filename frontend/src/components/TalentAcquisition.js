import { Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import TimeBox from "./TimeBox";
import InterviewerCard from "./InterviewerCard";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import * as React from 'react';


export const TalentAcquisition = () => {

    const [value, setValue] = React.useState(dayjs('2022-08-18T10:00:00'));
    const [interviewers, setInterviewers] = useState([]);

    const fetchInterviewersList = async () => {
        const list = await axios.get("http://localhost:8000/interviewersList");

        setInterviewers(list.data.data);
    }

    useEffect(() => {
        fetchInterviewersList();
    }, []);

    return(<>
        {/* <Navbar /> */}
        
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
