import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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