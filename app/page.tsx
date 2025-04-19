"use client";
import { Box } from "@mui/material"
import LinkInput from "@/app/components/LinkInput"
import ShortCode from "@/app/components/ShortCode";
import ShortenButton from "@/app/components/ShortenButton";
import Header from "@/app/components/Header";
import { UrlProvider } from "@/app/context/UrlContext"
import React from "react";
import LinkOutput from "@/app/components/LinkOutput";
export default function Home() {
    return(
        <UrlProvider>
            <Box>
                <Header />
                <Box sx={{
                    background: "linear-gradient(#ab6393, #9c8ade)",
                    height: "100vh",
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <LinkInput/>
                    <ShortCode/>
                    <LinkOutput/>
                    <ShortenButton/>
                </Box>
            </Box>
        </UrlProvider>

    );
}
