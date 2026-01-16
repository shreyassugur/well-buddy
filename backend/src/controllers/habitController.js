import Habit from "../models/Habit.js";
import HabitLog from "../models/HabitLog.js";
import User from "../models/User.js";

// @desc    Get all habits for user
// @route   GET /api/habits
// @access  Private
export const getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id });
        res.status(200).json(habits);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a new habit
// @route   POST /api/habits
// @access  Private
export const createHabit = async (req, res) => {
    try {
        const { title, description, frequency } = req.body;

        const habit = await Habit.create({
            userId: req.user.id,
            title,
            description,
            frequency: frequency || "daily"
        });

        res.status(201).json(habit);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
// @access  Private
export const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        // Ensure user owns habit
        if (habit.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedHabit);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
// @access  Private
export const deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        if (habit.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await habit.deleteOne();
        res.status(200).json({ message: "Habit removed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Log habit completion for today
// @route   POST /api/habits/:id/log
// @access  Private
export const logHabitCompletion = async (req, res) => {
    try {
        const habitId = req.params.id;
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        const habit = await Habit.findById(habitId);
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        // Check authorization
        if (habit.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Check if already logged today
        const existingLog = await HabitLog.findOne({
            habitId,
            userId: req.user.id,
            date: today
        });

        if (existingLog) {
            // Already logged today - toggle off
            await existingLog.deleteOne();
            await User.findByIdAndUpdate(req.user.id, { $inc: { totalPoints: -10 } });
            return res.status(200).json({ message: "Habit completion undone", completed: false });
        }

        // Calculate streak
        const lastLogged = habit.lastLoggedDate ? new Date(habit.lastLoggedDate) : null;

        if (lastLogged) {
            lastLogged.setHours(0, 0, 0, 0);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastLogged.getTime() === yesterday.getTime()) {
                // Logged yesterday, continue streak
                habit.currentStreak += 1;
            } else if (lastLogged.getTime() !== today.getTime()) {
                // Missed a day, reset streak
                habit.currentStreak = 1;
            }
        } else {
            // First time logging
            habit.currentStreak = 1;
        }

        habit.lastLoggedDate = today;
        await habit.save();

        // Log new completion
        await HabitLog.create({
            habitId,
            userId: req.user.id,
            date: today,
            completed: true
        });

        // Add points
        await User.findByIdAndUpdate(req.user.id, { $inc: { totalPoints: 10 } });

        res.status(200).json({
            message: "Habit marked complete",
            pointsEarned: 10,
            completed: true,
            currentStreak: habit.currentStreak
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get habit logs for a user (e.g. for calendar/streaks)
// @route   GET /api/habits/logs
// @access  Private
export const getHabitLogs = async (req, res) => {
    try {
        const logs = await HabitLog.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get longest active streak across all habits
// @route   GET /api/habits/streak
// @access  Private
export const getLongestStreak = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.id, isActive: true });

        const longestStreak = habits.reduce((max, habit) => {
            return habit.currentStreak > max ? habit.currentStreak : max;
        }, 0);

        res.status(200).json({ longestStreak });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
