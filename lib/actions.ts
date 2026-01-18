import { connectToDatabase } from "@/lib/db";
import { Portfolio } from "@/models/Portfolio";
import { portfolioData } from "@/lib/data";

export async function getPortfolioData() {
    await connectToDatabase();

    // Try to find existing data in the database
    let data = await Portfolio.findOne();

    // If no data exists, seed it with local data (First run only)
    if (!data) {
        const seedData = {
            personalInfo: {
                ...portfolioData.personalInfo,
                backgroundUrl: '/blackboard-bg.jpg',
                profileImageUrl: '/profile.png'
            },
            techStack: portfolioData.techStack,
            projects: portfolioData.projects,
            education: portfolioData.education,
            experience: portfolioData.experience
        };

        data = await Portfolio.create(seedData);
    }

    // Return plain object needed for Client Components
    return JSON.parse(JSON.stringify(data));
}
