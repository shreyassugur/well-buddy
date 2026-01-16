import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    type: {
        type: String,
        enum: ["cardio", "strength", "flexibility"],
        required: true
    },
    durationMinutes: { type: Number, required: true },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
