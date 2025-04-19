"use client";
import { Button, Typography, Box } from "@mui/material";
import { useContext, useState } from "react";
import { UrlContext } from "@/app/context/UrlContext";

export default function ShortenButton() {
    const { urlData, setUrlData, setIsShortened } = useContext(UrlContext);
    const [error, setError] = useState<string | null>(null);
    const [isValidationError, setIsValidationError] = useState(false);

    const handleShorten = async () => {
        if (!urlData.originalUrl || !urlData.shortCode) {
            setIsValidationError(true);
            setError("Both URL and alias are required");
            return;
        }

        setError("");
        setIsShortened(false);

        try {
            const response = await fetch('/api/shorten', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    originalUrl: urlData.originalUrl,
                    shortCode: urlData.shortCode,
                }),
            });

            const data = await response.json();

            if (data.error) {
                setIsValidationError(true);
                setError(data.error);
                return;
            }

            setIsShortened(true);
        } catch (error) {
            setIsValidationError(true);
            setError(error instanceof Error ? error.message : "Failed to create URL");
        }
    };

    const handleRetry = () => {
        setError("");
        setUrlData({
            originalUrl: "",
            shortCode: "",
        });
        setIsValidationError(false);
        setIsShortened(false);
    };

    //if there is a validation error then show the error
    if (isValidationError) {
        return (
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Typography
                    sx={{
                        color: "black",
                        backgroundColor: "#ff0000",
                        margin: "1vw",
                        padding: 2,
                        borderRadius: "5px",
                        fontWeight: "bold"
                    }}
                >
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleRetry}
                    sx={{
                        backgroundColor: "#ff0000",
                        fontWeight: "bold"
                    }}
                >
                    Clear and Try Again
                </Button>
            </Box>
        );
    }

    //regular button (no error)
    return (
        <Button
            variant="contained"
            onClick={handleShorten}
            sx={{
                fontFamily: '"Roboto", sans-serif',
                background: "#CF9FFF",
                border: "1px solid black",
                "&:hover": {
                    background: "#5705b3"
                },
                width: "60%",
            }}
        >
            Shorten URL
        </Button>
    );
}