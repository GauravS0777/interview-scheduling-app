import {Button} from "@mui/material"

export default function LogoutBtn (props){

    const logoutClicked = () => {
        localStorage.clear();
        props.forceUpdate();
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
