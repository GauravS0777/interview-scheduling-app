import {Button} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function LogoutBtn (props){

    const navigate = useNavigate();

    const logoutClicked = () => {
        localStorage.clear();
        props.forceUpdate();
        // navigate("/");
    }

    return(<>
        <Button
        variant="contained"
        sx={{
            position: "absolute",
            right: "30px",
            backgroundColor: "black",
            "&:hover": {
                backgroundColor: "black"
            },
            textTransform: "none"
        }}
        onClick={logoutClicked}
        >
            Logout
        </Button>
    </>)
}
