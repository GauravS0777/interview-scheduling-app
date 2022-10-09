import { Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import TimeBox from "./TimeBox";
import InterviewerCard from "./InterviewerCard";

export const TalentAcquisition = () => {

    return(<>
        <Navbar />
        
        <Typography
        variant="h4"
        align="center"
        >
            Interview Scheduling App
        </Typography>

        <TimeBox />

        <InterviewerCard />

    </>);
}
