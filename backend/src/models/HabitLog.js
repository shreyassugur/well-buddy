import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema({
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true }, // Should probably be just the date part, but Date object is fine
    completed: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
export default HabitLog;
