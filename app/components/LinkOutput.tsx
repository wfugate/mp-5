import {Container, TextField, Typography} from "@mui/material";
import { Link } from "@mui/material";
import {useContext} from "react";
import {UrlContext} from "@/app/context/UrlContext";
export default function LinkOutput() {

    const { urlData, setUrlData } = useContext(UrlContext);
    return (
        <Container
            sx={{
                border: 1,
                backgroundColor: "white",
                borderRadius: "10px",
                paddingTop: "1vh",
                paddingBottom: "1vh",
                width: "60%",
                margin: "2vw",
                marginTop: 0,
            }}

        >
            <Typography

            >
                Your shortened link:
            </Typography>
        <Link
            onClick={() => {""}}
            sx={{
                fontSize: 26,
                marginLeft: "6vw",
                marginRight:"2vw"

            }}

        >
            http://localhost:3000/{urlData.shortCode}
        </Link>
        </Container>
    );
}