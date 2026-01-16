import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalPoints: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
}, {
    timestamps: { createdAt: false, updatedAt: true } // Spec says updatedAt: Date
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
