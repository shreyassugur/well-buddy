import mongoose from "mongoose";

const challengeParticipantSchema = new mongoose.Schema({
    challengeId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    pointsEarned: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
});

const ChallengeParticipant = mongoose.model("ChallengeParticipant", challengeParticipantSchema);
export default ChallengeParticipant;
