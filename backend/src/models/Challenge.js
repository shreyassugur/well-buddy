import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    goal: { type: Number, required: true }, // e.g. number of repetitions, minutes, etc.
    points: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "admin" }, // Fixed value as per spec
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
