import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    frequency: { type: String, enum: ["daily"], default: "daily" },
    isActive: { type: Boolean, default: true },
    currentStreak: { type: Number, default: 0 },
    lastLoggedDate: { type: Date, default: null }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Habit = mongoose.model("Habit", habitSchema);
export default Habit;
