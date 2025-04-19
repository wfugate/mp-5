import {Box, Button, Container, Typography} from "@mui/material";
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
        setTimeout(() => {
            setCopied(false);
        }, 3000);
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
                textAlign: "center"
            }}

        >
            <Typography
                sx={{
                    fontFamily: '"Roboto", sans-serif',
                }}

            >
                Your shortened link:
            </Typography>
            <Box>
                <Link
                    href={shortenedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        fontSize: "1.3rem",
                        fontFamily: '"Roboto", sans-serif',
                        color: "black",
                        wordBreak: "break-all",
                        "&:hover": {
                            textDecoration: "underline",
                            color: "#cfaaf9"
                        }
                    }}
                >
                    {shortenedUrl}
                </Link>
            </Box>
            <Button
                variant="contained"
                onClick={copyToClipboard}
                sx={{
                    marginTop: "2vh",
                    backgroundColor: "#CF9FFF"
                }}
            >
                Copy to clipboard
            </Button>
            {copied && (
                <Typography
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                    }}
                >Copied to clipboard!</Typography>
            )}
        </Container>
    );
}