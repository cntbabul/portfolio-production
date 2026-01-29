export const portfolioData = {
    personalInfo: {
        name: "Babul Miah",
        title: "Fulstack Web & Mobile Developer, Sen. Pharmacist ",
        contacts: [
            { type: "call", value: "+91 8011022154", label: "+91 8011 ******" },
            { type: "whatsapp", value: "+91 8011022154", label: "+91 8011 ******" },
        ],
        backgroundUrl: "https://images.pexels.com/photos/5685084/pexels-photo-5685084.jpeg",
        profileImageUrl: "https://images.pexels.com/photos/35881900/pexels-photo-35881900.jpeg",

        theme: {
            primaryColor: "white",
            secondaryColor: "#a0a0a0", // gray-400 equivalent
            accentColor: "#ffffff"
        }
    },
    techStack: ["Nextjs", "React Native", "Nodejs", "MongoDB", "Prisma", "Tailwindcss", "Typescript"],
    projects: [
        {
            title: "annonFeedback",
            description: "A feedback app for anonymous feedback.",
            link: "https://anonfeedback-nextjs.vercel.app/",
            type: "Web App",
            imageUrl: "#"
        },

    ],
    education: [
        { degree: "MCom", institute: "KKHSOU-Mangaldoi Commerce College", year: "2024 - Present" },
        { degree: "BCA", institute: "KKHSOU-Khanapara City Center", year: "2019 - 2024" },
        { degree: "D. Pharm", institute: "IP,GMCH-ghy", year: "2013 - 2017" }
    ],
    experience: [
        {
            role: "Sen. Pharmacist",
            company: "Tata 1mg Healthcare Solutions Pvt. Ltd. | Darrang Cancer Center",
            period: "2021 - 2023",
            description: "Dispensing, Patient Counselling, Medicine Audit & Stock Management."
        },
        {
            role: "Sen. Executive",
            company: "Reliance Retail Pvt. Ltd. & Netmeds Pharmacy",
            period: "2020 - 2021",
            description: "Dispensing, Patient Counselling, Medicine Audit & Stock Management."
        }, {
            role: "Community Pharmacist",
            company: "Tyroon Tea Company Ltd.",
            period: "2018 - 2020",
            description: "Patient Counselling, Dispensing, Stock Management & Dispensary Incharge."
        },



    ],
    policies: [
        {
            "lipi": `
        <h1>Privacy Policy for LiPi</h1>
        <p>This Privacy Policy describes how LiPi ("we," "our," or "the App") handles your information.</p>

        <h2>1. Data Collection</h2>
        <p>LiPi is designed to help you manage tasks. To provide cloud synchronization, we store the tasks you create in a secure online database. This may include task titles and completion status.</p>

        <h2>2. Authentication</h2>
        <p>If the app requires a login, we use secure authentication methods to ensure only you can access your data.</p>

        <h2>3. Data Storage</h2>
        <p>Your data is stored in a cloud-based database to allow for multi-device synchronization. We do not sell or share your personal task data with third parties.</p>

        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services (like Firebase or Supabase) for database management and hosting. These services have their own privacy policies regarding data handling.</p>

        <h2>5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via our support channel.</p>
        `
        }
    ]
};
