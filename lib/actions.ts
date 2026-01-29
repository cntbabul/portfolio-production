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
                backgroundUrl: "https://images.pexels.com/photos/5685084/pexels-photo-5685084.jpeg",
                profileImageUrl: "https://images.pexels.com/photos/35881900/pexels-photo-35881900.jpeg",
            },
            techStack: portfolioData.techStack,
            projects: portfolioData.projects,
            education: portfolioData.education,
            experience: portfolioData.experience,
            policies: portfolioData.policies
        };

        data = await Portfolio.create(seedData);
    } else {
        // FORCE SEED: Update everything from local data
        data.personalInfo = portfolioData.personalInfo;
        data.techStack = portfolioData.techStack;
        data.projects = portfolioData.projects;
        data.education = portfolioData.education;
        data.experience = portfolioData.experience;
        data.policies = portfolioData.policies;
        await data.save();
    }

    // Return plain object needed for Client Components
    return JSON.parse(JSON.stringify(data));
}
