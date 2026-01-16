import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    totalPoints: { type: Number, default: 0 },
    profilePic: { type: String, default: "" },
    age: { type: Number, default: null },
    weight: { type: Number, default: null }, // in kg
    height: { type: Number, default: null }, // in cm
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;