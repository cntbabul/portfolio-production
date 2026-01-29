import { connectToDatabase } from "@/lib/db";
import { Portfolio } from "@/models/Portfolio";
import { portfolioData } from "@/lib/data";

export async function getPortfolioData() {
    await connectToDatabase();

    // Use findOneAndUpdate to atomically update or create the data.
    // This prevents VersionErrors (race conditions) during concurrent builds/requests
    // because it updates the document in a single database operation instead of
    // the non-atomic find -> modify -> save pattern.
    const data = await Portfolio.findOneAndUpdate(
        {}, // Match the single portfolio document (singleton)
        {
            $set: {
                personalInfo: portfolioData.personalInfo,
                techStack: portfolioData.techStack,
                projects: portfolioData.projects,
                education: portfolioData.education,
                experience: portfolioData.experience,
                policies: portfolioData.policies
            }
        },
        {
            new: true, // Return the modified document
            upsert: true, // Create if it doesn't exist
            setDefaultsOnInsert: true, // Apply schema defaults for new docs
            runValidators: true // Ensure data strictly matches schema
        }
    );

    // Return plain object needed for Client Components
    return JSON.parse(JSON.stringify(data));
}
