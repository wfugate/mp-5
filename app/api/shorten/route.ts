import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";


const MONGO_URI = process.env.MONGODB_URI || "";
const client = new MongoClient(MONGO_URI);

const domainExists = async (hostname: string): Promise<boolean> => {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(hostname)}`);
        const data = await response.json();
        return data.Answer && data.Answer.length > 0;
    } catch (error) {
        console.error("DNS check failed:", error);
        return false;
    }
};

export async function POST(request: Request) {
    try {
        const { originalUrl, shortCode } = await request.json();

        //basic validation for https or http
        if (!originalUrl || !shortCode) {
            return NextResponse.json({ error: 'URL and code required' }, { status: 400 });
        }

        if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
            return NextResponse.json({
                error: "URL must start with http:// or https://"
            }, { status: 400 });
        }

        //checking url format
        let urlObj;
        try {
            urlObj = new URL(originalUrl);
        } catch {
            return NextResponse.json({
                error: "Invalid URL format"
            }, { status: 400 });
        }

        //checking if the domain exists
        try {
            const exists = await domainExists(urlObj.hostname);
            if (!exists) {
                return NextResponse.json({
                    error: "This domain doesn't exist or isn't properly configured"
                }, { status: 400 });
            }
        } catch (err) {
            console.error("Domain check error:", err);
            return NextResponse.json({
                error: "Unable to verify domain existence"
            }, { status: 500 });
        }

        //verify the alias isn't duplicate
        try {
            await client.connect();
            const collection = client.db("urls").collection("shortenedUrls");

            const existingUrl = await collection.findOne({ shortCode });
            if (existingUrl) {
                return NextResponse.json({ error: "Alias is already in use" }, { status: 409 });
            }

            //save to database
            await collection.insertOne({
                originalUrl,
                shortCode,
            });

            return NextResponse.json({
                success: true,
                shortUrl: `/${shortCode}`
            });
        } catch (error){
            console.error("Database error:", error);
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}