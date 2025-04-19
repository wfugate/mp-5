"use client";
import { Typography } from "@mui/material";

export default function Header() {
    return (
        <Typography
            variant="h1"
            sx={{
                background: "#ab6393",
                color: "white",
                padding: { xs: 2, md: 3 },
                textAlign: "center",
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 700,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            URL Shortener
        </Typography>
    );
}