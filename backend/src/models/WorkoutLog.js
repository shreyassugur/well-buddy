import mongoose from "mongoose";

const workoutLogSchema = new mongoose.Schema({
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    caloriesBurned: { type: Number, default: 0 },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const WorkoutLog = mongoose.model("WorkoutLog", workoutLogSchema);
export default WorkoutLog;
