
import mongoose from 'mongoose';
import { connectToDatabase } from './lib/db';
import { Portfolio } from './models/Portfolio';
import { portfolioData } from './lib/data';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
    try {
        console.log('Connecting to database...');
        await connectToDatabase();
        console.log('Connected.');

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

        console.log('Seeding data...', JSON.stringify(seedData.personalInfo.theme, null, 2));

        await Portfolio.findOneAndUpdate({}, seedData, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });

        console.log('Seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
