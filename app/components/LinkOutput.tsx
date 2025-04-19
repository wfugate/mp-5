import {Button, Container, Typography} from "@mui/material";
import { Link } from "@mui/material";
import {useContext, useState} from "react";
import {UrlContext} from "@/app/context/UrlContext";
export default function LinkOutput() {

    const [copied, setCopied] = useState<boolean>(false);
    const { urlData, isShortened } = useContext(UrlContext);
    if (!isShortened) {
        return <></>
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
        setCopied(true);
    }
    const shortenedUrl = `${window.location.origin}/${urlData.shortCode}`;
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
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                fontSize: 26,
                marginLeft: "6vw",
                marginRight:"2vw"

            }}

        >
            {shortenedUrl}
        </Link>
            <Button
                variant="contained"
                onClick={copyToClipboard}
                sx={{
                    marginTop: "2vh",
                }}
            >

            </Button>
            {copied && (
                <Typography>Copied to clipboard!</Typography>
            )}
        </Container>
    );
}