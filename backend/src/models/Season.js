import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "January 2026", "Q1 2026"
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    type: { type: String, enum: ["monthly", "quarterly", "yearly"], default: "monthly" }
}, {
    timestamps: true
});

const Season = mongoose.model("Season", seasonSchema);
export default Season;
