import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../src/models/User.js";
import Habit from "../src/models/Habit.js";
import HabitLog from "../src/models/HabitLog.js";
import Workout from "../src/models/Workout.js";
import WorkoutLog from "../src/models/WorkoutLog.js";
import Challenge from "../src/models/Challenge.js";
import ChallengeParticipant from "../src/models/ChallengeParticipant.js";
import Leaderboard from "../src/models/Leaderboard.js";

// -- CONFIGURATION --
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from backend root (assuming script is in backend/scripts)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const resetDatabase = async () => {
    if (!process.env.MONGO_URI) {
        console.error("❌ Error: MONGO_URI is not defined in .env");
        process.exit(1);
    }

    console.log("⚠️  WARNING: THIS SCRIPT WILL DELETE ALL DATA IN THE DATABASE.");
    console.log("⚠️  Target Database:", process.env.MONGO_URI.split("@")[1] || "Localhost/Unknown"); // Mask auth details
    console.log("⚠️  Process starting in 3 seconds... Ctrl+C to cancel.");

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB.");

        // Clear all collections
        await User.deleteMany({});
        await Habit.deleteMany({});
        await HabitLog.deleteMany({});
        await Workout.deleteMany({});
        await WorkoutLog.deleteMany({});
        await Challenge.deleteMany({});
        await ChallengeParticipant.deleteMany({});
        await Leaderboard.deleteMany({});

        console.log("🗑️  Deleted all data.");
        console.log("✨ CAUTION: Database reset complete. All collections rely on Schemas, which are preserved.");

    } catch (error) {
        console.error("❌ Error resetting database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected.");
        process.exit(0);
    }
};

resetDatabase();
