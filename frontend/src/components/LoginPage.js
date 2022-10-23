import { TextField, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography } from "@mui/material"


export default function LoginPage() {

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
                sx={{margin: "10px 0 20px 0"}}
                >
                    Login Page
                </Typography>

                <TextField variant="outlined" label="username" sx={{margin: "10px 0"}}/>
                <TextField variant="outlined" label="password" type="password" sx={{margin: "10px 0"}}/>

                <FormLabel id="demo-radio-buttons-group-label"
                sx={{
                    marginTop: "20px",
                    display: "block"
                }}
                >Position</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Talent Acqusition"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="Talent Acqusition" control={<Radio />} label="Talent Acqusition" />
                    <FormControlLabel value="Interviewer" control={<Radio />} label="Interviewer" />
                </RadioGroup>

                <Button
                variant="contained"
                sx={{
                    margin: "20px 0"
                }}
                >
                    Login
                </Button>
            </div>        
        </div>
    </>)

}