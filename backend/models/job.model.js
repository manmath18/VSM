import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title is required"],
        minlength: [2, "Job title must be at least 2 characters long"],
        maxlength: [100, "Job title must be at most 100 characters long"]
    },
    description: {
        type: String,
        required: [true, "Job description is required"],
        minlength: [10, "Job description must be at least 10 characters long"],
        maxlength: [2000, "Job description must be at most 2000 characters long"]
    },
    requirements: {
        type: [String],
        required: [true, "Job requirements are required"],
        validate: {
            validator: function (reqs) {
                return reqs.length > 0;
            },
            message: "At least one requirement is required"
        }
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: [0, "Salary cannot be negative"]
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: [2, "Location must be at least 2 characters long"],
        maxlength: [100, "Location must be at most 100 characters long"]
    },
    jobType: {
        type: String,
        required: [true, "Job type is required"],
        enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Freelance"],
        default: "Full-Time"
    },
    experience: {
        type: String,
        required: [true, "Experience level is required"],
        enum: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead"],
        default: "Fresher"
    },
    position: {
        type: Number,
        required: [true, "Number of positions is required"],
        min: [1, "At least one position is required"]
    }
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
