import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { company,title, description, requirements, salary, location, jobType, experience, position } = req.body;
        const userId = req.id;

        if (!company || !title || !description || !requirements || !salary || !location || !jobType || !experience || !position) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Ensure requirements is an array
        const formattedRequirements = Array.isArray(requirements) ? requirements : requirements.split(",");

        const job = await Job.create({
            company,
            title,
            description,
            requirements: formattedRequirements,
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job opportunity created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}