import { connectToDatabase } from "@/lib/db";
import { Portfolio } from "@/models/Portfolio";

export async function getPortfolioData() {
    await connectToDatabase();

    // Fetch existing data from the database.
    // We no longer seed from local files; all updates must happen manually in DB.
    const data = await Portfolio.findOne();

    // Return plain object needed for Client Components
    return JSON.parse(JSON.stringify(data || {}));
}
