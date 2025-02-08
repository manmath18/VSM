import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "" // Default empty string to store it in MongoDB
    },
    education: {
        tenth: {
            school: { type: String, default: "" },
            location: { type: String, default: "" }
        },
        twelfth: {
            school: { type: String, default: "" },
            location: { type: String, default: "" }
        },
        diploma: {
            institution: { type: String, default: "" },
            location: { type: String, default: "" }
        },
        degree: {
            university: { type: String, default: "" },
            location: { type: String, default: "" }
        }
    },
    alumniYear: {
        type: Number,
        default: null // Default null ensures it appears in the database
    },
    organisation: {
        currentJob: {
            companyName: { type: String, default: "" },
            designation: { type: String, default: "" },
            jobDescription: { type: String, default: "" }
        },
        pastExperiences: [
            {
                companyName: { type: String, default: "" },
                designation: { type: String, default: "" },
                jobDescription: { type: String, default: "" }
            }
        ]
    },
    skills: {
        type: [String],
        default: [] // Empty array ensures it appears in MongoDB
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
