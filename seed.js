
const mongoose = require('mongoose');
require('dotenv').config();

const PortfolioSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        title: { type: String, required: true },
        contacts: [{
            type: { type: String, required: true },
            value: { type: String, required: true },
            label: { type: String, required: true }
        }],
        backgroundUrl: { type: String, default: '/blackboard-bg.png' },
        theme: {
            primaryColor: { type: String, default: '#ffffff' },
            secondaryColor: { type: String, default: '#a0a0a0' },
            accentColor: { type: String, default: '#ffffff' }
        },
        profileImageUrl: { type: String, default: '/profile.png' }
    },
    techStack: [{ type: String }],
    projects: [new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        link: { type: String, default: '#' },
        type: { type: String, required: true }
    })],
    education: [new mongoose.Schema({
        degree: { type: String, required: true },
        institute: { type: String, required: true },
        year: { type: String, required: true }
    })],
    experience: [new mongoose.Schema({
        role: { type: String, required: true },
        company: { type: String, required: true },
        period: { type: String, required: true },
        description: { type: String, required: true }
    })]
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

const seedData = {
    personalInfo: {
        name: "babul miah",
        title: "Fulstack web & Mobile dev.",
        contacts: [
            { type: "call", value: "+91 8011022154", label: "c +91 8011022154" },
            { type: "whatsapp", value: "+91 8011022154", label: "w +91 8011022154" },
        ],
        backgroundUrl: '/blackboard-bg.png',
        profileImageUrl: '/profile.png',
        theme: {
            primaryColor: "#ffffff",
            secondaryColor: "#a0a0a0",
            accentColor: "#ffffff"
        }
    },
    techStack: ["react", "nextjs", "react native"],
    projects: [
        {
            title: "Doctors-appointment",
            description: "A comprehensive platform for booking medical appointments.",
            link: "#",
            type: "Web App"
        },
        {
            title: "Doctors-appointment",
            description: "Mobile interface for doctor scheduling.",
            link: "#",
            type: "Mobile App"
        },
        {
            title: "Doctors-appointment",
            description: "Patient dashboard and history management.",
            link: "#",
            type: "Web App"
        },
        {
            title: "Doctors-appointment",
            description: "Admin panel for hospital management.",
            link: "#",
            type: "Admin Panel"
        }
    ],
    education: [
        { degree: "Mcom", institute: "University Name", year: "2022 - 2024" },
        { degree: "bca", institute: "University Name", year: "2019 - 2022" },
        { degree: "d. pharm", institute: "University Name", year: "2017 - 2019" }
    ],
    experience: [
        {
            role: "Senior Developer",
            company: "Tech Company",
            period: "2020 - Present",
            description: "Worked on various fullstack projects using React, Next.js, and Node.js. Led a team of 5 developers."
        },
        {
            role: "Junior Developer",
            company: "StartUp Inc",
            period: "2018 - 2020",
            description: "Developed and maintained client websites using HTML, CSS, and JavaScript."
        }
    ]
};

async function run() {
    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected. Seeding...");

        const result = await Portfolio.findOneAndUpdate({}, seedData, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        });

        console.log("Seeded successfully:", JSON.stringify(result.personalInfo.theme, null, 2));
        process.exit(0);
    } catch (e) {
        console.error("Error:", e);
        process.exit(1);
    }
}

run();
