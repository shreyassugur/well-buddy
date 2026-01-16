import Workout from "../models/Workout.js";
import WorkoutLog from "../models/WorkoutLog.js";
import User from "../models/User.js";

// @desc    Get all workouts (templates)
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
    try {
        // Can users see only their own workouts or system workouts?
        // Assuming user created workouts.
        const workouts = await Workout.find({ userId: req.user.id });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a workout template
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res) => {
    try {
        const { name, type, durationMinutes } = req.body;

        const workout = await Workout.create({
            userId: req.user.id,
            name,
            type,
            durationMinutes
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Log a workout session
// @route   POST /api/workouts/log
// @access  Private
export const logWorkout = async (req, res) => {
    try {
        const { workoutId, date, caloriesBurned } = req.body;

        const workout = await Workout.findById(workoutId);
        if (!workout) return res.status(404).json({ message: "Workout not found" });

        // Create log
        const log = await WorkoutLog.create({
            workoutId,
            userId: req.user.id,
            date: date || new Date(),
            completed: true,
            caloriesBurned: caloriesBurned || 0 // Could calc based on duration * type multiplier
        });

        // Award points (e.g., 50 points per workout)
        await User.findByIdAndUpdate(req.user.id, { $inc: { totalPoints: 50 } });

        res.status(201).json({ message: "Workout logged", pointsEarned: 50, log });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get workout logs
// @route   GET /api/workouts/logs
// @access  Private
export const getWorkoutLogs = async (req, res) => {
    try {
        const logs = await WorkoutLog.find({ userId: req.user.id })
            .populate('workoutId', 'name type')
            .sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
