"use client";
import {TextField} from "@mui/material";
import { UrlContext } from "@/app/context/UrlContext";
import {useContext} from "react";
export default function ShortCode() {
    const { urlData, setUrlData } = useContext(UrlContext);

    return (
        <TextField
            placeholder="alias"
            sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                width: "30%",
                margin: "2vw"



            }}
            value={urlData.shortCode}
            onChange={(e) => setUrlData({ ...urlData , shortCode: e.target.value })}

        />
    )
}
