import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js'; 

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password } = req.body;

        // Check if all fields are provided
        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Email validation for @vsm.co.in domain
        const emailRegex = /^[a-zA-Z0-9._%+-]+@vsm\.co\.in$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Email is not affiliated with VSM.",
                success: false
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Email validation for @vsm.co.in domain
        const emailRegex = /^[a-zA-Z0-9._%+-]+@vsm\.co\.in$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid Email.",
                success: false
            });
        }

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Filter out sensitive user details
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };

        return res
            .status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, phoneNumber, bio, skills, location, alumniYear, education, organisation } = req.body;
        
        const file = req.file; //(profile photo)
        let profilePhoto = "";
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", success: false });
        }
        // Split skills if provided
        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // Middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }
        let cloudResponse=undefined;
        if (file) {
            const fileUri = getDataUri(file);
            if (!fileUri || !fileUri.content) {
                return res.status(400).json({ message: "File conversion failed", success: false });
              }
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhoto = cloudResponse.secure_url; 
        }
       
        // Updating fields
        if (fullname) user.fullname = fullname;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.bio = bio;
        if (skills) user.skills = skillsArray; // Update skills array
        if (location) user.location = location; // Update location

        // Update education section if provided
        if (education) {
            if (education.tenth) {
                user.education.tenth.school = education.tenth.school || user.education.tenth.school;
                user.education.tenth.location = education.tenth.location || user.education.tenth.location;
            }
            if (education.twelfth) {
                user.education.twelfth.school = education.twelfth.school || user.education.twelfth.school;
                user.education.twelfth.location = education.twelfth.location || user.education.twelfth.location;
            }
            if (education.diploma) {
                user.education.diploma.institution = education.diploma.institution || user.education.diploma.institution;
                user.education.diploma.location = education.diploma.location || user.education.diploma.location;
            }
            if (education.degree) {
                user.education.degree.university = education.degree.university || user.education.degree.university;
                user.education.degree.location = education.degree.location || user.education.degree.location;
            }
        }

        // Update alumniYear if provided
        if (alumniYear) user.alumniYear = alumniYear;

        // Update organisation section if provided
        if (organisation) {
            if (organisation.currentJob) {
                user.organisation.currentJob.companyName = organisation.currentJob.companyName || user.organisation.currentJob.companyName;
                user.organisation.currentJob.designation = organisation.currentJob.designation || user.organisation.currentJob.designation;
                user.organisation.currentJob.jobDescription = organisation.currentJob.jobDescription || user.organisation.currentJob.jobDescription;
            }

            if (organisation.pastExperiences && Array.isArray(organisation.pastExperiences)) {
                user.organisation.pastExperiences = organisation.pastExperiences.length > 0 ? organisation.pastExperiences : user.organisation.pastExperiences;
            }
        }

        // Upload and save profile photo or resume
        if (cloudResponse) {
            user.profilePhoto = cloudResponse.secure_url || user.profilePhoto; 
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            location: user.location,
            bio: user.bio,
            skills: user.skills,
            education: user.education,
            alumniYear: user.alumniYear,
            organisation: user.organisation,
            profilePhoto: user.profilePhoto
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
        });
    }
};
