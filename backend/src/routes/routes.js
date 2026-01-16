import express from "express";
import {
    signup,
    login,
    getProfile,
    updateProfile,
    resetPoints
} from "../controllers/authController.js";
import {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    logHabitCompletion,
    getHabitLogs,
    getLongestStreak
} from "../controllers/habitController.js";
import {
    getWorkouts,
    createWorkout,
    logWorkout,
    getWorkoutLogs
} from "../controllers/workoutController.js";
import {
    getChallenges,
    createChallenge,
    joinChallenge,
    getMyChallenges,
    updateChallengeProgress
} from "../controllers/challengeController.js";
import {
    getLeaderboard
} from "../controllers/leaderboardController.js";

import { protect } from "../middleware/auth.js";
// import { validate } from "../middleware/validate.js"; 

const routes = express.Router();

// Auth Routes
routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/auth/profile", protect, getProfile);
routes.put("/auth/profile", protect, updateProfile);
routes.post("/auth/reset-points", protect, resetPoints);

// Habit Routes
routes.get("/habits", protect, getHabits);
routes.post("/habits", protect, createHabit);
routes.put("/habits/:id", protect, updateHabit);
routes.delete("/habits/:id", protect, deleteHabit);
routes.post("/habits/:id/log", protect, logHabitCompletion);
routes.get("/habits/streak", protect, getLongestStreak);
routes.get("/habits/logs", protect, getHabitLogs);

// Workout Routes
routes.get("/workouts", protect, getWorkouts);
routes.post("/workouts", protect, createWorkout);
routes.post("/workouts/log", protect, logWorkout);
routes.get("/workouts/logs", protect, getWorkoutLogs);

// Challenge Routes
routes.get("/challenges", protect, getChallenges);
routes.post("/challenges", protect, createChallenge);
routes.post("/challenges/:id/join", protect, joinChallenge);
routes.get("/challenges/my", protect, getMyChallenges);
routes.put("/challenges/:id/progress", protect, updateChallengeProgress);

// Leaderboard Routes
routes.get("/leaderboard", protect, getLeaderboard);

export default routes;