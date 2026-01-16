import Challenge from "../models/Challenge.js";
import ChallengeParticipant from "../models/ChallengeParticipant.js";

// @desc    Create a new challenge
// @route   POST /api/challenges
// @access  Private (Users can create challenges)
export const createChallenge = async (req, res) => {
    try {
        const { title, description, goal, points, endDate } = req.body;

        const challenge = await Challenge.create({
            title,
            description,
            goal,
            points,
            startDate: new Date(), // Default to current date
            endDate,
            createdBy: req.user.id
        });

        res.status(201).json({ message: "Challenge created successfully", challenge });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all challenges
// @route   GET /api/challenges
// @access  Private (Publicly visible to users)
export const getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true });
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Join a challenge
// @route   POST /api/challenges/:id/join
// @access  Private
export const joinChallenge = async (req, res) => {
    try {
        const challengeId = req.params.id;
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        const existing = await ChallengeParticipant.findOne({
            challengeId,
            userId: req.user.id
        });

        if (existing) {
            return res.status(400).json({ message: "Already joined this challenge" });
        }

        await ChallengeParticipant.create({
            challengeId,
            userId: req.user.id
        });

        res.status(201).json({ message: "Joined challenge successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get user's joined challenges
// @route   GET /api/challenges/my
// @access  Private
export const getMyChallenges = async (req, res) => {
    try {
        const participants = await ChallengeParticipant.find({ userId: req.user.id })
            .populate('challengeId');

        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update challenge progress
// @route   PUT /api/challenges/:id/progress
// @access  Private
export const updateChallengeProgress = async (req, res) => {
    try {
        const challengeId = req.params.id;
        const { progress } = req.body;

        const participant = await ChallengeParticipant.findOne({
            challengeId,
            userId: req.user.id
        }).populate('challengeId');

        if (!participant) {
            return res.status(404).json({ message: "You haven't joined this challenge" });
        }

        // Update progress
        participant.progress = progress;

        // Check if challenge is completed
        if (progress >= participant.challengeId.goal && !participant.isCompleted) {
            participant.isCompleted = true;

            // Award points to user
            const User = (await import("../models/User.js")).default;
            await User.findByIdAndUpdate(req.user.id, {
                $inc: { totalPoints: participant.challengeId.points }
            });
        }

        await participant.save();

        res.status(200).json({
            message: participant.isCompleted ? "Challenge completed! Points awarded!" : "Progress updated",
            participant
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
