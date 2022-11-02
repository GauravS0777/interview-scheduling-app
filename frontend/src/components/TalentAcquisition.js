import { Typography } from "@mui/material";
import TimeBox from "./TimeBox";
import InterviewerCard from "./InterviewerCard";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import InterviewCard2 from "./InterviewCard2";


export const TalentAcquisition = () => {

    const [value, setValue] = React.useState(dayjs('2022-11-15T10:00:00'));
    const [interviewers, setInterviewers] = useState([]);
    const [interviews, setInterviews] = useState([]);
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

            console.log(list.data.data);
            setInterviewers(list.data.data);
        }catch(error){
            console.log(error);
        }
    }

    const fetchAcceptedInterviews = async () => {
        try{
            const list = await axios.get("http://localhost:8000/acceptedInterviews", {
                headers: {
                    "accessToken": localStorage.getItem("accessToken")
                }
            });

            console.log(list.data.data);
            setInterviews(list.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInterviewersList();
        fetchAcceptedInterviews();
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


        <Typography
        variant="h5"
        align="center"
        sx={{marginTop: "40px"}}
        >
            Aligned Interviews
        </Typography>

        <div
        style={{
            paddingBottom: "20px"
        }}
        >

        {
            interviews.map((value, idx) => {
                return <InterviewCard2 data={value} key={idx} />
            })
        }

        </div>

    </>);
}
