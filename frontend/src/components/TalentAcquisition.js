import { Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import TimeBox from "./TimeBox";
import InterviewerCard from "./InterviewerCard";
import { useEffect, useState } from "react";
import axios from "axios";


export const TalentAcquisition = () => {

    const [interviewers, setInterviewers] = useState([]);

    const fetchInterviewersList = async () => {
        const list = await axios.get("http://localhost:8000/interviewersList");
        setInterviewers(list.data.data);
    }

    useEffect(() => {
        fetchInterviewersList();
    }, []);

    return(<>
        <Navbar />
        
        <Typography
        variant="h4"
        align="center"
        >
            Interview Scheduling App
        </Typography>

        <TimeBox />

        {
            interviewers.map((val) => {
                return <InterviewerCard data={val}/>
            })
        }

    </>);
}
