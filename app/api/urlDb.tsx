import { MongoClient, Db, Collection } from "mongodb";
import {redirect} from "next/navigation";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
    throw new Error("MongoDB URI is missing");
}
const DB_NAME = "urls";
let client: MongoClient | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI)
        await client.connect();
    }
    return client.db(DB_NAME);
}

export interface UrlPair{
    originalUrl: string;
    shortCode: string;
}

export async function getUrlCollection(): Promise<Collection<UrlPair>>{
    const db = await connect();
    return db.collection<UrlPair>("urls");
}

export async function saveUrl(originalUrl: string, shortCode: string): Promise<UrlPair> {
    const collection = await getUrlCollection();
    const existingUrl = await collection.findOne({ shortCode });
    if (existingUrl) {  // Changed from !existingUrl to existingUrl
        throw new Error("Your url has already been taken, sorry :(")
    }
    const urlPair: UrlPair = {
        originalUrl,
        shortCode
    }
    await collection.insertOne(urlPair);
    return urlPair;
}
export async function getUrlByShortCode(shortCode: string): Promise<string | null> {
    const collection = await getUrlCollection();
    const result = await collection.findOne({ shortCode });


    if (result && result.originalUrl) {
        let url = result.originalUrl;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        redirect(url);
    }

    return result?.originalUrl || null;
}