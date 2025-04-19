import { NextResponse } from 'next/server';
import { MongoClient } from "mongodb";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const shortCode = url.pathname.split('/').pop() || '';

    const MONGO_URI = process.env.MONGODB_URI || "";
    if (!MONGO_URI) {
        return new Response('Database configuration error', { status: 500 });
    }

    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const collection = client.db("urls").collection("shortenedUrls");

        const result = await collection.findOne({ shortCode });

        if (!result) {
            return new Response('That shortened link does not exist', { status: 404 });
        }

        return NextResponse.redirect(result.originalUrl);
    } catch {
        return new Response('Server error', { status: 500 });
    } finally {
        await client.close();
    }
}