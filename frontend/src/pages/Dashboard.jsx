import { useEffect, useState } from "react";
import api from "../api/axios";
import {
    Trophy,
    Flame,
    Target,
    Dumbbell,
    TrendingUp,
    Award
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Stat Card Component
const StatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
            {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalPoints: 0,
        activeStreaks: 0,
        challengesJoined: 0,
        workoutsDone: 0
    });
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState([]);

    // Generate mock activity data for the chart (last 7 days)
    const generateActivityData = (totalPoints, workouts) => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            // Simulate points distribution over the week
            const basePoints = Math.floor(totalPoints / 7);
            const variance = Math.floor(Math.random() * 20) - 10;

            data.push({
                day: dayName,
                points: Math.max(0, basePoints + variance)
            });
        }
        return data;
    };

    const activityData = generateActivityData(stats.totalPoints, stats.workoutsDone);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [profileRes, challengesRes, workoutsRes, streakRes] = await Promise.all([
                    api.get("/auth/profile"),
                    api.get("/challenges/my"),
                    api.get("/workouts/logs"),
                    api.get("/habits/streak")
                ]);

                const points = profileRes.data.totalPoints || 0;
                const streak = streakRes.data.longestStreak || 0;
                const challenges = challengesRes.data.length;
                const workouts = workoutsRes.data.length;

                setStats({
                    totalPoints: points,
                    activeStreaks: streak,
                    challengesJoined: challenges,
                    workoutsDone: workouts
                });

                // Generate achievements based on stats
                const newAchievements = [];

                if (points >= 100) newAchievements.push({ icon: "🏆", text: "Earned 100+ points!", color: "text-yellow-600" });
                if (points >= 50) newAchievements.push({ icon: "⭐", text: "Reached 50 points milestone", color: "text-blue-600" });
                if (streak >= 7) newAchievements.push({ icon: "🔥", text: "7-day habit streak!", color: "text-orange-600" });
                if (streak >= 3) newAchievements.push({ icon: "💪", text: "3-day streak achieved", color: "text-green-600" });
                if (challenges >= 3) newAchievements.push({ icon: "🎯", text: "Joined 3 challenges", color: "text-purple-600" });
                if (workouts >= 5) newAchievements.push({ icon: "🏋️", text: "Completed 5 workouts", color: "text-red-600" });
                if (points > 0) newAchievements.push({ icon: "🌟", text: "Started your wellness journey!", color: "text-green-600" });

                setAchievements(newAchievements.slice(0, 5)); // Show only recent 5
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, track your wellness journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Points"
                    value={stats.totalPoints}
                    icon={Trophy}
                    colorClass="bg-yellow-500"
                />
                <StatCard
                    title="Active Streaks"
                    value={stats.activeStreaks}
                    subtext="days"
                    icon={Flame}
                    colorClass="bg-orange-500"
                />
                <StatCard
                    title="Challenges Joined"
                    value={stats.challengesJoined}
                    icon={Target}
                    colorClass="bg-blue-500"
                />
                <StatCard
                    title="Workouts Done"
                    value={stats.workoutsDone}
                    icon={Dumbbell}
                    colorClass="bg-purple-500"
                />
            </div>

            {/* Activity Overview & Achievements Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Overview Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h3 className="font-bold text-gray-800">Activity Overview</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="day"
                                    stroke="#999"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#999"
                                    style={{ fontSize: '12px' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '12px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="points"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={{ fill: '#10b981', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Points earned over the last 7 days</p>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-4">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-bold text-gray-800">Recent Achievements</h3>
                    </div>
                    <div className="space-y-3">
                        {achievements.length > 0 ? (
                            achievements.map((achievement, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <span className="text-2xl">{achievement.icon}</span>
                                    <span className={`font-medium ${achievement.color}`}>{achievement.text}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                <p className="text-sm">Start your journey to unlock achievements!</p>
                                <p className="text-xs mt-2">Complete habits, workouts, and challenges to earn badges.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
