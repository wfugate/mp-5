"use client";
import React, { createContext, useState, ReactNode } from "react";

interface UrlData {
    originalUrl: string;
    shortCode: string;
}

interface UrlContextType {
    urlData: UrlData;
    setUrlData: React.Dispatch<React.SetStateAction<UrlData>>;
    isShortened: boolean;
    setIsShortened: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with default values
export const UrlContext = createContext<UrlContextType>({
    urlData: { originalUrl: "", shortCode: "" },
    setUrlData: () => {},
    isShortened: false,
    setIsShortened: () => {},
});

interface UrlProviderProps {
    children: ReactNode;
}

export const UrlProvider: React.FC<UrlProviderProps> = ({ children }) => {
    const [isShortened, setIsShortened] = useState(false);
    const [urlData, setUrlData] = useState<UrlData>({
        originalUrl: "",
        shortCode: "",
    });

    return (
        <UrlContext.Provider value={{ urlData, setUrlData, isShortened, setIsShortened }}>
            {children}
        </UrlContext.Provider>
    );
};