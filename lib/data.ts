export const portfolioData = {
    personalInfo: {
        name: "babul miah",
        title: "Fulstack web & Mobile dev.",
        contacts: [
            { type: "call", value: "+91 8011022154", label: "c +91 8011022154" },
            { type: "whatsapp", value: "+91 8011022154", label: "w +91 8011022154" },
        ],
        theme: {
            primaryColor: "green",
            secondaryColor: "#a0a0a0", // gray-400 equivalent
            accentColor: "#ffffff"
        }
    },
    techStack: ["react", "nextjs", "react native"],
    projects: [

        {
            title: "Doctors-appointment",
            description: "Mobile interface for doctor scheduling.",
            link: "#",
            type: "Mobile App"
        },

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
