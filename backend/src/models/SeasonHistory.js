import mongoose from "mongoose";

const seasonHistorySchema = new mongoose.Schema({
    seasonId: { type: mongoose.Schema.Types.ObjectId, ref: "Season", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true },
    rank: { type: Number }
}, {
    timestamps: true
});

const SeasonHistory = mongoose.model("SeasonHistory", seasonHistorySchema);
export default SeasonHistory;
