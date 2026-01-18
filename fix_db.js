
const mongoose = require('mongoose');
require('dotenv').config();

// Use a flexible schema to detect the array
const Portfolio = mongoose.model('Portfolio_Fix', new mongoose.Schema({
    personalInfo: {
        theme: mongoose.Schema.Types.Mixed
    }
}, { strict: false, collection: 'portfolios' })); // Explicit collection name usually 'portfolios'

async function fix() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected.");

        const doc = await Portfolio.findOne();
        if (!doc) {
            console.log("No document found.");
            return;
        }

        console.log("Current Theme Type:", Array.isArray(doc.personalInfo.theme) ? "Array" : typeof doc.personalInfo.theme);

        if (Array.isArray(doc.personalInfo.theme)) {
            console.log("Detected Array! converting to Object...");
            const correctTheme = doc.personalInfo.theme[0];

            // Log what we are setting
            console.log("Setting to:", correctTheme);

            // Directly set the field using $set
            await Portfolio.updateOne(
                { _id: doc._id },
                { $set: { "personalInfo.theme": correctTheme } }
            );
            console.log("Database fixed successfully.");
        } else {
            console.log("Structure appears correct already.");
            console.log(doc.personalInfo.theme);
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
fix();
