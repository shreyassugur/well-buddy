import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password, profilePic, age, weight, height } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash: hashedPassword,
            role: "user",
            totalPoints: 0,
            profilePic,
            age: age || null,
            weight: weight || null,
            height: height || null
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Error Details:", error);
        return res.status(500).json({ message: "Internal server error: " + error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                totalPoints: user.totalPoints
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        delete updates.password; // Do not allow password update here

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
        res.status(200).json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const resetPoints = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { totalPoints: 0 },
            { new: true }
        ).select("-passwordHash");

        res.status(200).json({ message: "Points reset successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}