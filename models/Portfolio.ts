import mongoose, { Schema, model, models } from "mongoose";

// Profile / Personal Info Schema
const PersonalInfoSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    contacts: [{
        type: { type: String, required: true }, // 'call', 'whatsapp', etc.
        value: { type: String, required: true },
        label: { type: String, required: true }
    }],
    backgroundUrl: { type: String, default: '/blackboard-bg.png' }, // Added for manual BG change
    theme: {
        primaryColor: { type: String, default: '#ffffff' },
        secondaryColor: { type: String, default: '#a0a0a0' },
        accentColor: { type: String, default: '#ffffff' }
    },
    profileImageUrl: { type: String, default: '/profile.png' }
});

// Tech Stack is just an array of strings in the main portfolio object or a separate doc
// We can keep it simple: One "Portfolio" document that holds everything, 
// OR separate collections. A single document is easier for "Portfolio" unless you possess multiple portfolios.
// But typically "Projects" are many. "Experience" are many.

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, default: '#' },
    type: { type: String, required: true } // 'Web App', 'Mobile App', etc.
});

const EducationSchema = new Schema({
    degree: { type: String, required: true },
    institute: { type: String, required: true },
    year: { type: String, required: true }
});

const ExperienceSchema = new Schema({
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true }
});

// Main Portfolio Schema to aggregate everything
const PortfolioDataSchema = new Schema({
    personalInfo: PersonalInfoSchema,
    techStack: [{ type: String }],
    projects: [ProjectSchema],
    education: [EducationSchema],
    experience: [ExperienceSchema]
}, { timestamps: true });

// Use a singleton model based on a fixed ID or just fetch the first one
export const Portfolio = models.Portfolio || model("Portfolio", PortfolioDataSchema);
