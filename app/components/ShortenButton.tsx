"use client";
import { Button } from "@mui/material";
import {useContext, useState} from "react";
import {UrlContext} from "@/app/context/UrlContext";


export default function ShortenButton(){
    const { urlData, setUrlData } = useContext(UrlContext);
    
    const handleShorten = async () => {
        if (!urlData.originalUrl || !urlData.shortCode) {
            return;
        }
        
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

            
            setUrlData({
                ...urlData,
                shortCode: data.shortCode,
                
            });
        } catch (error) {
            setUrlData({
                ...urlData,
                shortCode:"",
            })
            return error;
        }
        
        
    }
    
    
    return (
        <Button
            variant="contained"
            onClick={handleShorten}
            sx={{
                background: "#CF9FFF"
            }}

        >Shorten!</Button>
    )
}