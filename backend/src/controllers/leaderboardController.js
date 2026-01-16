import Leaderboard from "../models/Leaderboard.js";
import User from "../models/User.js";

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
    try {
        // Simple implementation: fetch users sorted by totalPoints
        // In a real production app with millions of users, we'd use the dedicated Leaderboard collection 
        // updated via background jobs. For now, on-the-fly aggregation or simple sort is okay for v1.

        // Let's use User collection directly as it has totalPoints and likely sufficient for scale here.
        // We can limit to top 50.

        const topUsers = await User.find({ role: 'user' }) // Exclude admins
            .sort({ totalPoints: -1 })
            .limit(50)
            .select('name profilePic totalPoints');

        // Map to rank
        const leaderboard = topUsers.map((user, index) => ({
            rank: index + 1,
            userId: user._id,
            name: user.name,
            points: user.totalPoints,
            profilePic: user.profilePic // (Note: profilePic wasn't in User model spec update, careful. It was in previous User model. New one didn't mention it but good to have)
        }));

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
