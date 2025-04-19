"use client";
import {TextField} from "@mui/material";
import React, { useContext } from "react";
import { UrlContext } from "@/app/context/UrlContext";
export default function LinkInput() {
    const { urlData, setUrlData } = useContext(UrlContext);
    return (
        <TextField
            placeholder="ex:https://super.very.ultimate/long/link/that/you/will/neverremmeber.com"
            sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "60%",
                fontFamily: '"Roboto", sans-serif',
            }}
            value={urlData.originalUrl}
            onChange={(e) => setUrlData({ ...urlData, originalUrl: e.target.value })}
        />
    )
}
