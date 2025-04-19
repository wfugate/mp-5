import { redirect } from 'next/navigation';
import { MongoClient } from "mongodb";

//pageProps passes parameters into the page
type PageProps = {
    params: {
        shortCode: string;
    };
};

//function to find the redirect url using mongodb
export async function getRedirectUrl(shortCode: string): Promise<string | null> {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) {
        return null;
    }

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const collection = client.db("urls").collection("shortenedUrls");
        const result = await collection.findOne({ shortCode });

        if (result && result.originalUrl) {
            let url = result.originalUrl;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            return url;
        }
        return null;
    } catch (error) {
        console.error("Error finding URL:", error);
        return null;
    } finally {
        await client.close();
    }
}

//actual page component with the props passed in
export default async function RedirectPage({ params }: PageProps) {
    //get the shortcode from the parameters
    const { shortCode } = params;
    const redirectUrl = await getRedirectUrl(shortCode);

    if (redirectUrl) {
        redirect(redirectUrl);
    }

    //return in case no url was found.
    return <div>URL not found for code: {shortCode}</div>;
}