import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";


const MONGO_URI = process.env.MONGODB_URI || "";
const client = new MongoClient(MONGO_URI);

export async function POST(request: Request) {
    try {
        const { originalUrl, shortCode } = await request.json();

        //basic validation
        if (!originalUrl || !shortCode) {
            return NextResponse.json({ error: 'URL and code required' }, { status: 400 });
        }

        await client.connect();
        const collection = client.db("urls").collection("shortenedUrls");

        //save to database
        await collection.insertOne({
            originalUrl,
            shortCode,
        });

        return NextResponse.json({
            success: true,
            shortUrl: `/${shortCode}`
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}